<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Geocoder\Provider\GoogleMaps\GoogleMaps;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $lat = $request->query('lat');
        $lng = $request->query('lng');
        $radius = $request->get('radius', 10);

        $query = Activity::query()->when($search, function ($q, $search) 
        {
                return $q->where('name', 'LIKE', "%{$search}%")->orWhere('description', 'LIKE', "%{$search}%");
        })->when($lat && $lng, function ($q) use ($lat, $lng, $radius) 
        {
            return $q->selectRaw("
                activities.*,
                ( 6371 * acos( cos( radians({$lat}) ) * 
                    cos( radians( lat ) ) * 
                    cos( radians( lng ) - radians({$lng}) ) + 
                    sin( radians({$lat}) ) * sin( radians( lat ) ) ) 
            ) AS distance")->having('distance', '<', $radius)->orderBy('distance');
        });

        $activities = $query->paginate(10);

        return Inertia::render('Activities', compact('activities', 'search', 'lat', 'lng'));
    }

    public function show(Activity $activity)
    {
        $activity->load(['user', 'images']);
        
        if ($activity->track_points && !$activity->distance) 
        {
            $this->calculateActivityStats($activity);
            $activity->refresh();
        }

        $formattedActivity = [
            'id' => $activity->id,
            'name' => $activity->name,
            'description' => $activity->description,
            'price' => $activity->price . '€',
            'images' => $activity->images ? $activity->images->pluck('url')->toArray() : [$activity->image],
            'hours' => $activity->hours ? explode(',', $activity->hours) : [],
            'distance' => $activity->distance,
            'duration' => $activity->duration,
            'avg_speed' => $activity->avg_speed,
            'elevation_gain' => $activity->elevation_gain,
            'track_points' => $activity->track_points ? json_decode($activity->track_points, true) : null,
            'start_point' => $activity->track_points ? json_decode($activity->track_points, true)[0] ?? null : null,
        ];

        return Inertia::render('ActivitiesInfo', ['activity' => $formattedActivity]);
    }

    public function nearby(Request $request)
    {
        $lat = $request->input('lat');
        $lng = $request->input('lng');
        $radius = $request->input('radius', 10);

        $activities = Activity::selectRaw("
                *,
                ( 6371 * acos( cos( radians(?) ) * 
                  cos( radians( lat ) ) * 
                  cos( radians( lng ) - radians(?) ) + 
                  sin( radians(?) ) * sin( radians( lat ) ) ) 
            ) AS distance", [$lat, $lng, $lat])->having('distance', '<', $radius)->orderBy('distance')->limit(20)->get();

        return response()->json($activities);
    }

    public function storeTrack(Request $request)
    {
        $request->validate([
            'activity_id' => 'required|exists:activities,id',
            'track_points' => 'required|array|min:2',
            'track_points.*.lat' => 'required|numeric',
            'track_points.*.lng' => 'required|numeric',
        ]);

        $activity = Activity::findOrFail($request->activity_id);
        $stats = $this->calculateTrackStats($request->track_points);
        
        $activity->update([
            'track_points' => json_encode($request->track_points),
            'distance' => $stats['distance'],
            'duration' => $stats['duration'],
            'avg_speed' => $stats['avg_speed'],
            'elevation_gain' => $stats['elevation_gain'],
            'completed_at' => now(),
        ]);

        return response()->json(['message' => 'Saved route', 'stats' => $stats]);
    }

    private function calculateActivityStats(Activity $activity)
    {
        if (!$activity->track_points) return;
        
        $points = json_decode($activity->track_points, true);
        $stats = $this->calculateTrackStats($points);
        
        $activity->update($stats);
    }

    private function calculateTrackStats(array $points)
    {
        $distance = 0;
        $elevationGain = 0;
        
        for ($i = 1; $i < count($points); $i++) 
        {
            $prev = $points[$i-1];
            $curr = $points[$i];
            
            $distance += $this->haversineDistance(
                $prev['lat'], $prev['lng'],
                $curr['lat'], $curr['lng']
            );
            
            if (isset($prev['elevation'], $curr['elevation'])) 
            {
                $elevationGain += max(0, $curr['elevation'] - $prev['elevation']);
            }
        }
        
        $duration = 3600; 
        $avgSpeed = ($distance / 1000) / ($duration / 3600);
        
        return [
            'distance' => round($distance / 1000, 2), 
            'duration' => $duration,
            'avg_speed' => round($avgSpeed, 1),
            'elevation_gain' => round($elevationGain),
        ];
    }

    private function haversineDistance($lat1, $lon1, $lat2, $lon2)
    {
        $R = 6371000; 
        $φ1 = deg2rad($lat1);
        $φ2 = deg2rad($lat2);
        $Δφ = deg2rad($lat2 - $lat1);
        $Δλ = deg2rad($lon2 - $lon1);

        $a = sin($Δφ/2) * sin($Δφ/2) +
             cos($φ1) * cos($φ2) * sin($Δλ/2) * sin($Δλ/2);
        $c = 2 * atan2(sqrt($a), sqrt(1-$a));

        return $R * $c; 
    }

    public function verifyAuth()
    {
        if (Auth::check()) 
        {
            return redirect()->route('Cart');
        }
        
        return Inertia::render('LoginAlert', [
            'message' => 'You must register first',
            'redirect' => route('login')
        ]);
    }
}

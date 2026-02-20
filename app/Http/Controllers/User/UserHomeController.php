<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\Places;
use App\Models\Activity;
use Illuminate\Http\Request;

class UserHomeController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->input('search');

        $places = Places::all();

        // Organize continents
        $continents = [];
        foreach ($places as $place) {
            $continents[$place->continent][$place->country][] = $place->city;
        }

        // Popular cities based on activities
        $popularCities = Activity::select('place_id')
            ->with('place')
            ->groupBy('place_id')
            ->orderByRaw('COUNT(*) DESC')
            ->take(5)
            ->get()
            ->map(function ($a) {
                return [
                    'name' => $a->place->city,
                    'id' => $a->place->id,
                ];
            });

        // Fetch activities with search filter
        $activities = Activity::with('place')
            ->when($search, function ($query, $search) {
                $query->where('name', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%")
                      ->orWhereHas('place', function ($q) use ($search) {
                          $q->where('city', 'like', "%{$search}%")
                            ->orWhere('country', 'like', "%{$search}%");
                      });
            })
            ->get()
            ->map(function ($activity) {
                // Prefix image path to public/activities
                $activity->imagen = 'activities/' . $activity->imagen;
                return $activity;
            });

        return Inertia::render('USER/InitialPage', [
            'continents' => $continents,
            'popularCities' => $popularCities,
            'activities' => $activities,
            'search' => $search,
        ]);
    }
}
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
            ->where('is_active', true) // only active activities
            ->groupBy('place_id')
            ->orderByRaw('COUNT(*) DESC')
            ->take(5)
            ->get()
            ->map(function ($a) {
                return [
                    'name' => $a->place->city ?? 'Unknown',
                    'id' => $a->place->id ?? null,
                ];
            });

        // Fetch only active activities with search filter
        $activities = Activity::with('place')
            ->where('is_active', true)
            ->when($search, function ($query, $search) {
                $query->where(function($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('location', 'like', "%{$search}%")
                      ->orWhereHas('place', function ($q2) use ($search) {
                          $q2->where('city', 'like', "%{$search}%")
                             ->orWhere('country', 'like', "%{$search}%");
                      });
                });
            })
            ->get()
            ->map(function ($activity) {
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
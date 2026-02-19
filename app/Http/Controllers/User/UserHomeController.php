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
        // Search query
        $search = $request->input('search');

        // Fetch all places
        $places = Places::all();

        // Build continents → countries → cities structure
        $continents = [];
        foreach ($places as $place) {
            $continents[$place->continent][$place->country][] = $place->city;
        }

        // Popular cities (top 5 cities based on activity count)
        $popularCities = Activity::select('place_id')
            ->with('place')
            ->groupBy('place_id')
            ->orderByRaw('COUNT(*) DESC')
            ->take(6)
            ->get()
            ->map(function ($a) {
                return [
                    'name' => $a->place->city,
                    'id' => $a->place->id,
                ];
            });

        // Activities based on search (city or country)
        $activities = Activity::with('place')
            ->when($search, function($query) use ($search) {
                $query->whereHas('place', function($q) use ($search) {
                    $q->where('city', 'like', "%{$search}%")
                      ->orWhere('country', 'like', "%{$search}%");
                });
            })
            ->get();

        return Inertia::render('USER/InitialPage', [
            'continents' => $continents,
            'popularCities' => $popularCities,
            'activities' => $activities,
            'search' => $search,
        ]);
    }
}

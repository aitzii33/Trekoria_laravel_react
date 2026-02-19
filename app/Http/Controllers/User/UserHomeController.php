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

        $continents = [];
        foreach ($places as $place) {
            $continents[$place->continent][$place->country][] = $place->city;
        }

        $popularCities = Activity::select('place_id')->with('place')->groupBy('place_id')->orderByRaw('COUNT(*) DESC')->take(5)->get()
            ->map(function ($a) {
                return [
                    'name' => $a->place->city,
                    'id' => $a->place->id,
                ];
            });

      $activities = Activity::with('place')
    ->get()
    ->map(function ($activity) {
        // Just prefix with 'activities/' (relative to public)
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

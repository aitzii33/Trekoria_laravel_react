<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use App\Models\TrackPoint;
use Inertia\Inertia;

class UserActivitiesController extends Controller
{
    public function show($id)
    {
        // Fetch the activity with related place
        $activity = Activity::with('place')->findOrFail($id);

        // Render the ActivityDetails Inertia page
        return Inertia::render('USER/ActivityDetails', [
            'activity' => $activity
        ]);
    }

    public function trackPoints()
    {
        return $this->hasMany(TrackPoint::class);
    }

}

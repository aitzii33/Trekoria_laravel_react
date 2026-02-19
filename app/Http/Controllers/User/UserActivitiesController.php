<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Activity;
use Inertia\Inertia;

class UserActivitiesController extends Controller
{
     public function index()
    {
        // Fetch all activities (active and inactive)
        $activities = Activity::with('place')->get();

        return Inertia::render('USER/UserActivities', [
            'activities' => $activities,
        ]);
    }
}

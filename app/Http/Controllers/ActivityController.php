<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class ActivityController extends Controller
{
    public function form($id = null)
    {
        $activities = Activity::all();
        $selectedActivity = $id ? Activity::find($id) : null; 

        return Inertia::render('ActivitiesInfo', [
            'activities' => $activities,
            'selectedActivity' => $selectedActivity,
        ]);
    }

    public function verifyAuth()
    {
        if (Auth::check()) 
        {
            return redirect()->route('cart.index');
        }
        else 
        {
            return Inertia::render('LoginAlert', [
                'message' => 'First you have to register',
                'redirect' => route('login') 
            ]);
        }
    }
}

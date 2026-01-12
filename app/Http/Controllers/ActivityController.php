<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Activities;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function form($id = null)
    {
        $activities = Activities::all();
        $selectedActivity = $id ? Activities::find($id) : null; 

        return Inertia::render('ActivityInfo', [
            'activities' => $activities,
            'selectedActivity' => $selectedActivity,
        ]);
    }

    public function verifyAuth(Request $request)
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

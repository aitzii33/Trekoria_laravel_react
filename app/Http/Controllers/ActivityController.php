<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function form()
    {
        return Inertia::render('ActivityInfo', [
            'activities' => Activity::all(), 
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

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Activity;
use Illuminate\Http\Request;

class PageController extends Controller
{
    public function Landing()
    {
        return Inertia::render('LandingPage', [
            'auth' => [
                'user' => auth()->user() ? [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name,
                ] : null
            ]
        ]);
    }

    public function Home()
    {
        return Inertia::render('Initial_Page', [
            'auth' => [
                'user' => auth()->user() ? [
                    'id' => auth()->user()->id,
                    'name' => auth()->user()->name,
                ] : null
            ]
        ]);

    }

    public function Activities()
    {
        return Inertia::render('Activities', [ 
            'activities' => Activity::all(['place_id', 'name', 'description', 'continent', 'image'])
        ]);
    }

    public function About()
    {
        return Inertia::render('AboutUs');
    }
}

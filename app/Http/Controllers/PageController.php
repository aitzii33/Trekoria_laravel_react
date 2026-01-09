<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PageController extends Controller
{
    public function Landing()
    {
        return Inertia::render('LandingPage');
    }

    public function Home()
    {
        return Inertia::render('Initial_Page');
    }

    public function Activities()
    {
        return Inertia::render('Activities');
    }

    public function About()
    {
        return Inertia::render('AboutUs');
    }
}

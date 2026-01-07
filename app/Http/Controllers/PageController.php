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
}

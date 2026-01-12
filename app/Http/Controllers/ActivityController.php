<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ActivityController extends Controller
{
    public function form()
    {
        return Inertia::render('ActivityInfo');
    }

    public function verifyAuth(Request $request)
    {
        //all the date is required
        
        //if the user is log in they can register
        if(Auth::check()) 
        {
            // The user is logged in
        }
        else
        {
            //if not is going to appear a emerge window saying 'First you have to register' and when they click 'ok' it reddirect to the log in
        }
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class CartController extends Controller
{
    public function form()
    {
        return Inertia::render('ActivityInfo');
    }

    public function eliminateActivity(Request $request)
    {
        //all the date is required
        
        //eliminate a activity for the pay
    }

    public function __construct()
	{
	    $this->middleware('auth');
	}

}

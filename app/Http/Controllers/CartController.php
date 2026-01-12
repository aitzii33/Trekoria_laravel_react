<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class CartController extends Controller
{
    public function form()
    {
        return Inertia::render('Cart', [
            'activities' => Activity::all(), 
        ]);
    }

    public function eliminateActivity(Request $request)
    {
        $activities = session('activities', []);

        $activities = array_values(array_filter(
            $activities,
            fn ($a) => $a['id'] != $activity
        ));

        session(['activities' => $activities]);

        return back();
    }

    public function __construct()
	{
	    $this->middleware('auth');
	}

}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class PayController extends Controller
{
    public function form()
    {
        return Inertia::render('Payment');
    } 

    public function dataVerify()
    {
        //all the date is required
        
        //prove the street, dni, credit card (cvv/exp.date)
    }

    public function __construct()
	{
	    $this->middleware('auth');
	}

}

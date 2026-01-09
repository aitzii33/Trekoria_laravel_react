<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class RegisterController extends Controller
{
    public function form()
    {
        return Inertia::render('Register');
    }

    public function sendEmail(Request $request)
    {
        //all the date is required

        //verify if the user already exist

        //if the password have written 2 times and is the same
        
        //send the email
    }
}

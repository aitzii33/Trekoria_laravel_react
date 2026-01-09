<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class ForgotController extends Controller
{
    public function form()
    {
        return Inertia::render('Forgot_Pass');
    }

    public function sendEmail()
    {
        //if the email already exist in the db
        
        //send the email
    }
}

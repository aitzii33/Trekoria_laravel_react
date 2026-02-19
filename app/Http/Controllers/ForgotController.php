<?php

namespace App\Http\Controllers;

use App\Mail\ResetPasswordMail;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Password;
use Inertia\Inertia;

class ForgotController extends Controller
{
    public function form()
    {
        return Inertia::render('Forgot_Pass');
    }

    public function sendEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) 
        {
            return back()->withErrors(['email' => 'The user does not exist with that email.']);
        }

        $token = Password::createToken($user);

        Mail::to($user->email)->send(new ResetPasswordMail($user, $token));

        return redirect('/login')->with('status', 'Recovery email sent.');
    }
}

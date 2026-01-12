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
        $request->validate([
            'email' => 'required|email',
        ]);

        $user = User::where('email', $request->email)->first();

        if (!$user) {
            return back()->withErrors(['email' => 'The user does not exist with that email.']);
        }

        $token = Password::createToken($user);

        Mail::to($user->email)->send(new ResetPasswordMail($user, $token));
        return back()->with('status', 'Correo de recuperación enviado.');
    }
}

<?php

namespace App\Http\Controllers;

use App\Mail\RegisterConfirmation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Str;
use Inertia\Inertia;

class RegisterController extends Controller
{
    public function form()
    {
        return Inertia::render('RegistPage');
    }

    public function sendEmail(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'surname' => 'required|string|max:255',
            'birthday' => 'required|date',
            'email' => 'required|email|unique:users',
            'username' => 'required|string|unique:users',
            'password' => 'required|min:8|confirmed',  
        ]);

        $pendingData = $request->only([
            'name', 'surname', 'birthday', 'email', 'username'
        ]);
        
        $pendingData['password'] = $request->password; 
        $pendingData['pending_token'] = Str::uuid();
        $pendingData['pending_until'] = now()->addHour();
        $pendingData['is_pending'] = true;

        $user = User::create($pendingData);

        Mail::to($user->email)->send(new RegisterConfirmation($user));

        return redirect()->back()->with('status', 'Email sent! Confirm to activate.'); 
    }


    public function confirm($token)
    {
        $user = User::where('pending_token', $token)->where('pending_until', '>', now())->where('is_pending', true)->firstOrFail();

        $user->update([
            'password' => Hash::make($user->password),
            'pending_token' => null,
            'pending_until' => null,
            'is_pending' => false,
            'email_verified_at' => now(),
        ]);

        Auth::login($user);

        return inertia('RegisterSuccess');
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class RegisterController extends Controller
{
    // Show registration page
    public function form()
    {
        return Inertia::render('RegistPage'); // Make sure this path matches your React page
    }

    // Store user in DB
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,user_name',
            'email' => 'required|email|max:255|unique:users,email',
            'birthday' => 'required|date|before:-18 years',
            'password' => 'required|string|min:8|confirmed',
        ]);

        $user = \App\Models\User::create([
            'name' => $request->name,
            'last_name' => null,
            'user_name' => $request->username,
            'birth_day' => $request->birthday,
            'email' => $request->email,
            'password' => \Illuminate\Support\Facades\Hash::make($request->password),
            'type_user' => 1,
            'pending_token' => \Illuminate\Support\Str::uuid(),
            'pending_until' => now()->addHour(),
            'remember_token' => \Illuminate\Support\Str::random(10),
        ]);

        return redirect()->route('login')->with('status', 'Registration successful! Check your email to confirm.');
    }
}

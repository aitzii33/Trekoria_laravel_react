<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogInController extends Controller
{
    // Show login page
    public function form()
    {
        return Inertia::render('Login'); // make sure this matches your React page path
    }

    // Handle login POST
    public function login(Request $request)
    {
        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ]);

        $credentials = $request->only('username', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();

            $user = Auth::user();

            // Check if email is verified
            if ($user->pending_token !== null && $user->pending_until !== null && now()->lt($user->pending_until)) {
                Auth::logout();
                return redirect()->back()->with('status', 'You must verify your email before logging in.');
            }

            // Redirect based on user type
            if ($user->type_user == 2) {
                return redirect()->route('admin.dashboard'); // admin dashboard
            }

            return redirect()->intended('/home'); // normal user
        }

        return redirect()->back()->with('status', 'The username or password is incorrect.');
    }
}

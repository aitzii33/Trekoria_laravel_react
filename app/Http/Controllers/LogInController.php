<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LogInController extends Controller
{
    public function form()
    {
        return Inertia::render('Login', ['status' => session('status')]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'user_name' => 'required|text',
            'password' => 'required|string'
        ]);

        if (Auth::attempt($credentials)) 
        {
            $request->session()->regenerate();

            if (!Auth::user()->hasVerifiedEmail()) 
            {
                Auth::logout();
                return redirect()->back()->with('status', 'You must verify your email before logging in.');
            }

            $userdata = Auth::user();
            $cookie = cookie('userdata', json_encode($userdata), 60);  
            
            return redirect()->intended('/home')->cookie($cookie);  
        }

        return redirect()->back()->with('status', 'The username or password is incorrect.');
    }

    public function logout(Request $request)
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}

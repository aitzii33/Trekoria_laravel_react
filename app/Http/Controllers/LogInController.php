<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Log;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class LogInController extends Controller
{
    public function form()
    {
        return Inertia::render('Login', [
            'status' => session('status')
        ]);
    }

    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|string|email',
            'password' => 'required|string'
        ]);
        return redirect('/profile');
        Log::info('Intento de login', [ 'email' => $credentials['email'], 'password' => $credentials['password'], 'remember' =>  $request->boolean('remember'),]);

        if (Auth::attempt($credentials, $request->boolean('remember'))) 
        {
            $request->session()->regenerate();

            if (!Auth::user()->hasVerifiedEmail()) 
            {
                Auth::logout();
                return redirect('/profile');
                //return redirect()->back()->with('status', 'You must verify your email before logging in.');
            }
            
            Log::info('Usuario logueado', ['email' => $credentials['email']]);

            return redirect('/profile');
        }

        return redirect('/profile');
        
        //return redirect()->back()->with('status', 'The email or password is incorrect.');
    }

    public function logout(Request $request)
    {
        session()->forget('activities');

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login');
    }
}

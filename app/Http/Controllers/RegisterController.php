<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Support\Str;
use Illuminate\Http\Request;
use App\Mail\RegisterConfirmation;
use Illuminate\Support\Facades\Hash;

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

        if (User::where('email', $request->email)->orWhere('username', $request->username)->exists()) 
        {
            return redirect()->back()->with('error', 'The user exist yet');
        }

        $pendingData = $request->only(['name', 'surname', 'birthday', 'email', 'username', 'password']);
        $pendingData['token'] = Str::uuid(); 
        $pendingData['pending_until'] = now()->addHour();

        User::create($pendingData);  

        Mail::to($request->email)->send(new RegisterConfirmation($pendingData));

        return redirect()->back()->with('status', '¡Email enviado! Confirma para activar.');
    }

    public function confirm($token)
    {
        $user = User::where('pending_token', $token)->where('pending_until', '>', now())->firstOrFail();

        $user->update([
            'password' => Hash::make($user->password),
            'pending_token' => null,
            'pending_until' => null,
            'email_verified_at' => now(),
        ]);

        return inertia('RegisterSuccess');
    }

}

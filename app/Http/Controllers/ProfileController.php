<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;

class ProfileController extends Controller
{
    //for the form, to soft delete(the profile) and the modifications(username, password)
    public function form()
    {
        return Inertia::render('MyProfile');
    }

    public function SoftDelete(Request $request)
    {
        Auth::user()->delete(); // soft delete
        return redirect('/')->with('success', 'Profile deleted');
    }

    public function Restored($id)
    {
        User::withTrashed()->findOrFail($id)->restore();
        return redirect()->back()->with('success', 'Profile restored');
    }

    public function Modify(Request $request)
    {
        $user = $request->user();

        if ($user->trashed()) 
        {
            abort(403);
        }

        $validated = $request->validate([
            'username' => ['required', 'string', 'max:255', 'unique:users,username,' . $user->id],
            'current_password' => ['required', 'current_password'],
            'password' => ['nullable', 'confirmed', Password::defaults()]
        ]);

        $user->username = $validated['username'];

        if (!empty($validated['password'])) 
        {
            $user->password = Hash::make($validated['password']);
        }

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }
}

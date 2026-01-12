<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

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
        //modifications of the username and password
    }
}

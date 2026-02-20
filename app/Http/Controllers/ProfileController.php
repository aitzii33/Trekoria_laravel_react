<?php
namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ProfileController extends Controller
{
    public function form(Request $request)
    {
        $user = Auth::user();

        if (!$user) 
        {
            return Inertia::render('Profile', [
                'userdata' => null,
            ]);
        }

        return Inertia::render('Profile', [
            'userdata' => [
                'name' => $user->name,
                'last_nameb' => $user->last_name ?? '',
                'user_name' => $user->user_name ?? '',
                'birthDate' => $user->birthDate ?? '',
                'email' => $user->email,
                'image' => $user->image ?? null, 
            ],
        ]);
    }

    public function SoftDelete(Request $request)
    {
        $user = Auth::user();

        if (!$user) 
        {
            abort(403, 'No authenticated user.');
        }

        $user->delete(); 

        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return redirect('/login')->with('success', 'Profile deleted successfully.');
    }



    public function Modify(Request $request)
    {
        $user = $request->user();

        if ($user->trashed()) 
        {
            abort(403);
        }

        $validated = $request->validate([
            'user_name' => 'required|string|max:255|unique:users,username,' . $user->id,
            'name' => 'nullable|string|max:255',
            'last_name' => 'nullable|string|max:255',
            'birthDate' => 'nullable|date',
        ]);

        $user->username = $validated['username'];
        $user->name = $validated['name'] ?? $user->name;
        $user->last_name = $validated['last_name'] ?? $user->last_name;
        $user->birthDate = $validated['birthDate'] ?? $user->birthDate;

        $user->save();

        return back()->with('success', 'Profile updated successfully.');
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Activity;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth; 

class ActivityController extends Controller
{
    public function form($id = null)
    {
        $search = $request->query('search'); 
        
        $activities = Activity::when($search, function ($query, $search) 
        {
            return $query->where('name', 'LIKE', "%{$search}%")->orWhere('description', 'LIKE', "%{$search}%");
        })->paginate(10); 
        
        return view('activities.index', compact('activities', 'search'));
    }

    public function verifyAuth()
    {
        if (Auth::check()) 
        {
            return redirect()->route('cart.index');
        }
        else 
        {
            return Inertia::render('LoginAlert', [
                'message' => 'First you have to register',
                'redirect' => route('login') 
            ]);
        }
    }
}

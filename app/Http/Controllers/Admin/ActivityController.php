<?php

namespace App\Http\Controllers\Admin;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Models\Activity;
use Illuminate\Support\Facades\Auth; 
use App\Http\Controllers\Controller;

class ActivityController extends Controller
{
    public function index(Request $request)
    {
        $search = $request->query('search');
        $activities = Activity::when($search, function ($query, $search) 
        {
            return $query->where('name', 'LIKE', "%{$search}%");
        })->paginate(10); 
        
        return Inertia::render('Admin/Activities', [
    'activities' => $activities->through(fn($activity) => [
        'id' => $activity->id,
        'name' => $activity->name,
        'location' => $activity->location,
        'price' => $activity->price,
        'is_active' => $activity->is_active,
        'place' => $activity->place ? [
            'id' => $activity->place->id,
            'city' => $activity->place->city,
            'country' => $activity->place->country,
        ] : null,
    ]),
    'search' => $search,
]);

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

    public function store(Request $request)
{
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'location' => 'required|string',
        'price' => 'required|numeric',
        'is_active' => 'boolean',
        'place_id' => 'required|exists:places,id',
    ]);

    Activity::create($data);

    return redirect()->route('admin.activities.index');
}

public function edit(Activity $activity)
{
    return Inertia::render('Admin/ActivityForm', [
        'activity' => $activity,
        'places' => \App\Models\Places::all(),
    ]);
}

public function update(Request $request, Activity $activity)
{
    $data = $request->validate([
        'name' => 'required|string|max:255',
        'description' => 'required|string',
        'location' => 'required|string',
        'price' => 'required|numeric',
        'is_active' => 'boolean',
        'place_id' => 'required|exists:places,id',
    ]);

    $activity->update($data);

    return redirect()->route('admin.activities.index');
}

public function destroy(Activity $activity)
{
    $activity->delete();
    return redirect()->route('admin.activities.index');
}


}

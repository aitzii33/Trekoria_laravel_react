<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Activity ; 
use App\Models\Places;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminActivityController extends Controller
{
    public function index(Request $request)
{
    $search = $request->query('search');

    $activities = Activity::with('place')
        ->when($search, function ($query, $search) {
            $query->where('name', 'like', "%{$search}%")
                  ->orWhere('location', 'like', "%{$search}%")
                  ->orWhereHas('place', function ($q) use ($search) {
                      $q->where('city', 'like', "%{$search}%")
                        ->orWhere('country', 'like', "%{$search}%");
                  });
        })
        ->latest()
        ->paginate(50)
        ->withQueryString();

    return Inertia::render('Admin/Activities/Index', [
        'activities' => $activities,
        'places' => Places::select('id','city','country')->get(),
        'filters' => [
            'search' => $search
        ]
    ]);
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

        return redirect()->route('admin.activities.index')
            ->with('success', 'Activity created successfully.');
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

        return redirect()->route('admin.activities.index')
            ->with('success', 'Activity updated successfully.');
    }

    public function destroy(Activity $activity)
    {
        $activity->delete();

        return redirect()->route('admin.activities.index')
            ->with('success', 'Activity deleted.');
    }
}

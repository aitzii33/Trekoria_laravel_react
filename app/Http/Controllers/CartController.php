<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CartController extends Controller
{
    public function form()
    {
        $activities = session('activities', []);
        
        return Inertia::render('Cart', [
            'activities' => $activities
        ]);
    }

    public function eliminateActivity(Request $request, $id)
    {
        $activities = session('activities', []);

        $activities = array_values(array_filter(
            $activities,
            fn($a) => $a['id'] != $id
        ));

        session(['activities' => $activities]);

        return back()->with('message', 'Activity removed from cart');
    }

    public function addActivity(Request $request)
    {
        $request->validate([
            'activity_id' => 'required|exists:activities,id'
        ]);

        $activity = Activity::findOrFail($request->activity_id);
        $activities = session('activities', []);

        $exists = false;
        foreach ($activities as &$activityItem) {
            if ($activityItem['id'] == $request->activity_id) {
                $activityItem['quantity'] = ($activityItem['quantity'] ?? 1) + 1;
                $exists = true;
                break;
            }
        }

        if (!$exists) {
            $activities[] = [
                'id' => $activity->id,
                'name' => $activity->name,
                'price' => $activity->price,
                'image' => $activity->image,
                'hours' => $activity->hours ?? [],
                'quantity' => 1
            ];
        }

        session(['activities' => $activities]);

        return back()->with('message', 'Activity added to cart');
    }

    public function updateQuantity(Request $request, $id)
    {
        $request->validate([
            'quantity' => 'required|integer|min:1|max:10'
        ]);

        $activities = session('activities', []);
        foreach ($activities as &$activity) {
            if ($activity['id'] == $id) {
                $activity['quantity'] = $request->quantity;
                break;
            }
        }

        session(['activities' => $activities]);
        return back();
    }

    public function clearCart()
    {
        session()->forget('activities');
        return back()->with('message', 'Cart cleared');
    }

    public function __construct()
    {
        $this->middleware('auth');
    }
}

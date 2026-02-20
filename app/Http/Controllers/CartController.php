<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use Inertia\Inertia;
use Illuminate\Http\Request;

class CartController extends Controller
{
    /*public function __construct()
    {
        $this->middleware('auth');
    }*/

    public function form()
    {
        return Inertia::render('Cart', [
            'activities' => session('activities', [])
        ]);
    }

    public function addactivity(Request $request)
    {
        $request->validate([
            'activity_id' => 'required|exists:activities,id',
            'quantity' => 'sometimes|integer|min:1|max:10',
            'date' => 'sometimes|date',
            'hour' => 'sometimes|string',
        ]);

        $activity = Activity::findOrFail($request->activity_id);
        $activities = session('activities', []);

        $index = collect($activities)->search(fn($item) => $item['id'] == $activity->id);

        if ($index !== false) {
            $activities[$index]['quantity'] += $request->quantity ?? 1;
        } else {
            $activities[] = [
                'id' => $activity->id,
                'name' => $activity->name,
                'price' => $activity->price,
                'image' => $activity->image,
                'hours' => $activity->hours ?? [],
                'quantity' => $request->quantity ?? 1,
                'date' => $request->date ?? null,
                'hour' => $request->hour ?? null,
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

    public function eliminateActivity($id)
    {
        $activities = collect(session('activities', []))
            ->reject(fn($item) => $item['id'] == $id)
            ->values()
            ->toArray();

        session(['activities' => $activities]);

        return back()->with('message', 'Activity removed');
    }

    public function clearCart()
    {
        session()->forget('activities');

        return back()->with('message', 'Cart cleared');
    }
}

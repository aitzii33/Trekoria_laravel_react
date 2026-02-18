<?php

namespace App\Http\Controllers;

use App\Models\Orders;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OrderController extends Controller
{
    public function create()
    {
        return Inertia::render('Checkout/RegisterPage');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'full_name' => 'required|string|max:255',
            'dni' => 'required|string|max:20',
            'address' => 'required|string|max:255',
            'city' => 'required|string|max:100',
            'zip_code' => 'required|string|max:10',
            'card_number' => 'required|string|max:20',
            'card_name' => 'required|string|max:255',
            'expiry' => 'required|string|max:10',
            'cvv' => 'required|string|max:4|min:3',
        ]);

        $order = Orders::create($validated + [
            'status' => 'completed',
            'total' => 25.00
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Purchase completed successfully!',
            'order_id' => $order->id
        ]);
    }
}

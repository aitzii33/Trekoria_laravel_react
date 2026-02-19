<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Booking;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    // Users list
    public function users()
    {
        return Inertia::render('Admin/Customers', [
            'customers' => User::all(), // fetch all users
        ]);
    }

    // List customers
public function customers()
{
    return Inertia::render('Admin/Customers', [
        'customers' => User::all(),
    ]);
}

// Add new customer
public function storeCustomer(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email',
        'password' => 'required|string|min:6',
    ]);

    User::create([
        'name' => $request->name,
        'email' => $request->email,
        'password' => Hash::make($request->password),
    ]);

    return redirect()->route('admin.customers');
}

// Update customer
public function updateCustomer(Request $request, $id)
{
    $customer = User::findOrFail($id);

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => "required|email|unique:users,email,$id",
    ]);

    $customer->update([
        'name' => $request->name,
        'email' => $request->email,
        'password' => $request->password ? Hash::make($request->password) : $customer->password,
    ]);

    return redirect()->route('admin.customers');
}

// Delete customer
public function deleteCustomer($id)
{
    User::findOrFail($id)->delete();
    return redirect()->route('admin.customers');
}
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'bookings' => Booking::count(),
            ],
        ]);
    }
    // Show list of bookings
    public function bookings()
    {
        return Inertia::render('Admin/Bookings', [
            'bookings' => Booking::with('user')->get(),
        ]);
    }

    // Store new booking
    public function storeBooking(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'service' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|string|in:pending,confirmed,cancelled',
        ]);

        Booking::create($request->all());

        return redirect()->route('admin.bookings');
    }

    // Update booking
    public function updateBooking(Request $request, $id)
    {
        $booking = Booking::findOrFail($id);

        $request->validate([
            'user_id' => 'required|exists:users,id',
            'service' => 'required|string|max:255',
            'date' => 'required|date',
            'status' => 'required|string|in:pending,confirmed,cancelled',
        ]);

        $booking->update($request->all());

        return redirect()->route('admin.bookings');
    }

    // Delete booking
    public function deleteBooking($id)
    {
        Booking::findOrFail($id)->delete();
        return redirect()->route('admin.bookings');
    }

    public function analytics()
    {
        return Inertia::render('Analystic');
    }
}

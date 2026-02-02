<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Inertia\Inertia;
use App\Models\User;
use App\Models\Booking;

class AdminController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'users' => User::count(),
                'bookings' => Booking::count(),
            ]
        ]);
    }

    public function bookings()
    {
        return Inertia::render('Admin/Bookings', [
            'bookings' => Booking::all(),
        ]);
    }

    public function customers()
    {
        return Inertia::render('Admin/Customers', [
            'users' => User::all(),
        ]);
    }

    public function activities()
    {
        return Inertia::render('Admin/Activities', [
            // pass activity data
        ]);
    }

    public function analytics()
    {
        return Inertia::render('Admin/Analytics', [
            // pass analytics data
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Booking;
use App\Models\Guide;
use Illuminate\Http\Request;
use Carbon\Carbon;

class AnalyticsController extends Controller
{
    public function overview()
    {
        return response()->json([
            'total_activities' => Activity::count(),
            'total_bookings' => Booking::count(),
            'total_people' => Booking::sum('people'),
            'total_revenue' => Booking::sum('total_price'),
        ]);
    }

    public function activitiesMetrics()
    {
        $activities = Activity::withCount('bookings')->get();
        return response()->json($activities);
    }

    public function guidesMetrics()
    {
        $guides = Guide::withCount('bookings')->get();
        return response()->json($guides);
    }

    public function salesMetrics(Request $request)
    {
        $from = $request->from ? Carbon::parse($request->from)->startOfDay() : now()->subMonth()->startOfDay();
        $to = $request->to ? Carbon::parse($request->to)->endOfDay() : now()->endOfDay();

        $sales = Booking::whereBetween('created_at', [$from, $to])
            ->selectRaw('DATE(created_at) as date, SUM(total_price) as revenue, COUNT(*) as bookings')
            ->groupBy('date')
            ->orderBy('date')
            ->get();

        return response()->json($sales);
    }

    public function kpis()
    {
        return response()->json([
            'total_activities' => Activity::count(),
            'total_bookings' => Booking::count(),
            'total_people' => Booking::sum('people'),
            'total_revenue' => Booking::sum('total_price'),
        ]);
    }
}

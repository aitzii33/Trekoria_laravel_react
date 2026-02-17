<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Booking;
use App\Models\Guides;
use Carbon\Carbon;

class AnalysticController extends Controller
{
    public function overview()
    {
        $activities = Activity::with(['availabilities.bookings'])->get();
        $guides = Guides::with(['bookings'])->get();
        $bookings = Booking::with(['activity', 'availability', 'user'])->get();

        return response()->json([
            'total_activities' => Activity::count(),
            'total_bookings' => Booking::count(),
            'total_people' => Booking::sum('people'),
            'total_revenue' => Booking::sum('total_price'),
            'activities' => $activities,
            'guides' => $guides,
            'bookings' => $bookings
        ]);
    }

    public function index()
    {
        $data = [];

        // Total activity
        $data['total_activities'] = Activity::count();

        // Total reserves
        $data['total_bookings'] = Booking::count();

        // total people revenue
        $data['total_people'] = Booking::sum('people');

        // total revenue
        $data['total_revenue'] = Booking::sum('total_price');

        // today books
        $data['today_bookings'] = Booking::whereDate('created_at', Carbon::today())->count();

        // more popular activities
        $data['top_activities'] = Activity::withCount('bookings')->orderBy('bookings_count', 'desc')->take(5)->get(['id', 'name']);

        return response()->json($data);
    }

    public function activity_percent()
    {
        $activities = Activity::with(['availabilities' => function($q) {
            $q->withCount('bookings');
        }])->get()->map(function($activity) {
            $total_capacity = $activity->availabilities->sum('capacity');
            $total_reserved = $activity->availabilities->sum(function($availability) {
                return $availability->bookings()->sum('people');
            });

            $occupancy = $total_capacity > 0 ? ($total_reserved / $total_capacity) * 100 : 0;

            return [
                'activity_id' => $activity->id,
                'activity_name' => $activity->name,
                'occupancy_percent' => round($occupancy, 2)
            ];
        });

        return response()->json($activities);
    }

    public function guide()
    {
        $guides = Guides::withCount(['bookings'])->get()->map(function($guide) {
            return [
                'guide_id' => $guide->id,
                'name' => $guide->name,
                'total_bookings' => $guide->bookings_count,
            ];
        });

        return response()->json($guides);
    }

    public function month()
    {
        $monthly_sales = Booking::selectRaw('MONTH(created_at) as month, SUM(total_price) as revenue')->groupBy('month')->orderBy('month')->get();

        $daily_bookings = Booking::selectRaw('DATE(created_at) as date, COUNT(*) as total')->groupBy('date')->orderBy('date')->take(30)->get();

        return response()->json([
            'monthly_sales' => $monthly_sales,
            'daily_bookings' => $daily_bookings
        ]);
    }


    public function kpis()
    {
        $totalActivities = Activity::count();
        $totalBookings = Booking::count();
        $totalPeople = Booking::sum('people');
        $totalRevenue = Booking::sum('total_price');

        $topActivity = Activity::withCount('bookings')->orderBy('bookings_count', 'desc')->first();

        $topGuide = Guides::withCount('bookings')->orderBy('bookings_count', 'desc')->first();

        $totalCapacity = \DB::table('availabilities')->sum('capacity');
        $totalReserved = \DB::table('availabilities')->sum(\DB::raw('(SELECT COALESCE(SUM(people),0) FROM bookings WHERE availability_id = availabilities.id)'));
        $averageOccupancy = $totalCapacity > 0 ? round(($totalReserved / $totalCapacity) * 100, 2) : 0;

        return response()->json([
            'total_activities' => $totalActivities,
            'total_bookings' => $totalBookings,
            'total_people' => $totalPeople,
            'total_revenue' => $totalRevenue,
            'top_activity' => $topActivity ? $topActivity->name : null,
            'top_guide' => $topGuide ? $topGuide->name : null,
            'average_occupancy' => $averageOccupancy
        ]);
    }

}

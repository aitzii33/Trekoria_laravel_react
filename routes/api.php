<?php

use App\Http\Controllers\AnalyticsController;
use Illuminate\Support\Facades\Route;

Route::middleware('auth:sanctum')->group(function () 
{
    Route::get('/analytics/overview', [AnalyticsController::class, 'overview']);
    Route::get('/analytics/index', [AnalyticsController::class, 'index']);
    Route::get('/analytics/activity-percent', [AnalyticsController::class, 'activity_percent']);
    Route::get('/analytics/guides', [AnalyticsController::class, 'guide']);
    Route::get('/analytics/month', [AnalyticsController::class, 'month']);
    Route::get('/analytics/kpis', [AnalyticsController::class, 'kpis']);
});


<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () 
{
    return Inertia::render('LandingPage');
});

Route::get('/ContactUs', function () 
{
    return Inertia::render('Contact');
});

Route::get('/Home', function () 
{
    return Inertia::render('Initial_Page');
});

Route::get('/LogIn', function () 
{
    return Inertia::render('LogIn');
});

Route::get('/ForgotPass', function () 
{
    return Inertia::render('Forgot_Pass');
});

Route::get('/Register', function () 
{
    return Inertia::render('Register');
});

Route::get('/About', function () 
{
    return Inertia::render('AboutUs');
});

Route::get('/Profile', function () 
{
    return Inertia::render('MyProfile');
});

Route::get('/Activities', function () 
{
    return Inertia::render('Activities');
});

Route::get('/Activity', function () 
{
    return Inertia::render('ActivityInfo');
});

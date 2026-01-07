<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [PageController::class, 'Landing'])->name('landing');


Route::get('/ContactUs', [ContactController::class, 'form'])->name('contact.form');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');


Route::get('/Home', [PageController::class, 'Home'])->name('home');


Route::get('/login', [AuthController::class, 'showLogin'])->name('login.show');
Route::post('/login', [AuthController::class, 'login'])->name('login.perform');
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');


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



<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', [PageController::class, 'Landing'])->name('landing');
Route::get('/Home', [PageController::class, 'Home'])->name('home');
Route::get('/Activities', [PageController::class, 'Activities'])->name('activities');
Route::get('/About', [PageController::class, 'About'])->name('about');


Route::get('/ContactUs', [ContactController::class, 'form'])->name('contact');
Route::post('/contact', [ContactController::class, 'send'])->name('contact.send');


Route::get('/LogIn', [LogInController::class, 'form'])->name('login');
Route::post('/logIn', [LogInController::class, 'login'])->name('login.perform');
Route::post('/LogOut', [LogInController::class, 'logout'])->name('logout');


Route::get('/ForgotPass', [ForgotController::class, 'form'])->name('forgot');
Route::post('/SendEmail', [ForgotController::class, 'sendEmail'])->name('forgot.perform');


Route::get('/Register', [ForgotController::class, 'form'])->name('register');
Route::post('/SendEmail', [ForgotController::class, 'sendEmail'])->name('register.perform');


Route::get('/Profile', [LogInController::class, 'form'])->name('profile');
Route::post('/Delete', [LogInController::class, 'SoftDelete'])->name('profile.delete');
Route::post('/Modify', [LogInController::class, 'Modify'])->name('profile.modify');


Route::get('/Cart', [ForgotController::class, 'form'])->name('cart');
Route::post('/eliminateActivity', [ForgotController::class, 'eliminateActivity'])->name('cart.perform');


Route::get('/Pay', [ForgotController::class, 'form'])->name('pay');
Route::post('/VerifyAuth', [ForgotController::class, 'dataVerify'])->name('pay.perform');

Route::get('dashboard', 'App\Http\Controllers\CartController@dashboard')->middleware('auth');
Route::get('dashboard', 'App\Http\Controllers\PayController@dashboard')->middleware('auth');


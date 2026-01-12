<?php

use Inertia\Inertia;
use Laravel\Fortify\Features;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PayController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\LogInController;
use App\Http\Controllers\ForgotController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\RegisterController;

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


Route::get('/Register', [RegisterController::class, 'form'])->name('register');
Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
Route::get('/register/confirm/{token}', [RegisterController::class, 'confirm'])->name('register.confirm');


Route::get('/Profile', [ProfileController::class, 'form'])->name('profile');
Route::post('/Delete', [ProfileController::class, 'SoftDelete'])->name('profile.delete')->middleware('auth');
Route::post('/Modify', [ProfileController::class, 'Modify'])->name('profile.modify')->middleware('auth');
Route::post('/profile/{id}/restore', [ProfileRestoreController::class, 'restore']);



Route::get('/Cart', [CartController::class, 'form'])->name('cart');
Route::post('/eliminateActivity', [CartController::class, 'eliminateActivity'])->name('cart.perform');


Route::get('/Pay', [PayController::class, 'form'])->name('pay');
Route::post('/VerifyAuth', [PayController::class, 'dataVerify'])->name('pay.perform');


Route::get('/Activity', [ActivityController::class, 'form'])->name('Activity');
Route::post('/ActivityVerify', [ActivityController::class, 'verifyAuth'])->name('Activity.perform');


Route::get('dashboard', 'App\Http\Controllers\CartController@dashboard')->middleware('auth');
Route::get('dashboard', 'App\Http\Controllers\PayController@dashboard')->middleware('auth');


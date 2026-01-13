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
use App\Http\Controllers\Auth\ResetPasswordController;

Route::get('/', [PageController::class, 'Landing'])->name('landing');
Route::get('/home', [PageController::class, 'Home'])->name('home');
Route::get('/activities', [PageController::class, 'Activities'])->name('activities');
Route::get('/about', [PageController::class, 'About'])->name('about');


Route::get('/contact', [ContactController::class, 'form'])->name('contact');
Route::post('/contactsend', [ContactController::class, 'send'])->name('contact.send');


Route::get('/login', [LogInController::class, 'form'])->name('login');
Route::post('/loginprove', [LogInController::class, 'login'])->name('login.perform');
Route::post('/LogOut', [LogInController::class, 'logout'])->name('logout');


Route::get('/ForgotPass', [ForgotController::class, 'form'])->name('forgot');
Route::post('/SendEmail', [ForgotController::class, 'sendEmail'])->name('forgot.perform');


Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showForm'])->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');


Route::get('/Register', [RegisterController::class, 'form'])->name('register');
Route::post('/register', [RegisterController::class, 'store'])->name('register.store');
Route::get('/register/confirm/{token}', [RegisterController::class, 'confirm'])->name('register.confirm');


Route::get('/Profile', [ProfileController::class, 'form'])->name('profile');
Route::post('/Delete', [ProfileController::class, 'SoftDelete'])->name('profile.delete')->middleware('auth');
Route::post('/Modify', [ProfileController::class, 'Modify'])->name('profile.modify')->middleware('auth');
Route::post('/profile/{id}/restore', [ProfileController::class, 'restore']);

Route::get('/Pay', [PayController::class, 'form'])->name('pay');
Route::post('/VerifyAuth', [PayController::class, 'dataVerify'])->name('pay.perform');


Route::get('/Activity/{id?}', [ActivityController::class, 'form'])->name('Activity');
Route::post('/ActivityVerify', [ActivityController::class, 'verifyAuth'])->name('Activity.perform');


Route::middleware('auth')->group(function () {
    Route::get('/cart', [CartController::class, 'form'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'addActivity'])->name('cart.add');
    Route::post('/cart/{id}/update', [CartController::class, 'updateQuantity'])->name('cart.update');
    Route::delete('/cart/{id}', [CartController::class, 'eliminateActivity'])->name('cart.destroy');
    Route::delete('/cart/clear', [CartController::class, 'clearCart'])->name('cart.clear');
});



Route::get('dashboard', 'App\Http\Controllers\PayController@dashboard')->middleware('auth');
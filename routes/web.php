<?php

use Inertia\Inertia;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PayController;
use App\Http\Controllers\CartController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\ForgotController;
use App\Http\Controllers\LogInController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Admin\AdminActivityController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Admin\AdminController;
use App\Http\Controllers\ActivityController;
use App\Http\Controllers\Admin\AdminCustomerController;
use App\Http\Controllers\User\UserActivitiesController;
use App\Http\Controllers\User\UserHomeController;

Route::get('/', [PageController::class, 'Landing'])->name('landing');
Route::get('/home', [PageController::class, 'Home'])->name('home');
Route::get('/home2', [UserHomeController::class, 'index'])->name('user.home');
Route::post('/activities', [PageController::class, 'Activities'])->name('activities');
Route::get('/about', [PageController::class, 'About'])->name('about');


Route::get('/contact', [ContactController::class, 'form'])->name('contact');
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');


Route::get('/login', [LogInController::class, 'form'])->name('login');
Route::post('/login/prove', [LogInController::class, 'login'])->name('login.perform');
Route::post('/logout', [LogInController::class, 'logout'])->name('logout');


Route::get('/forgot', [ForgotController::class, 'form']); 
Route::post('/forgot.perform', [ForgotController::class, 'sendEmail']);


Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showForm'])->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');


Route::get('/register', [RegisterController::class, 'form'])->name('register.form');
Route::post('/register/send', [RegisterController::class, 'sendEmail'])->name('register.sendEmail');
Route::get('/register/confirm/{token}', [RegisterController::class, 'confirm'])->name('register.confirm');


Route::get('/profile', [ProfileController::class, 'form'])->name('profile'); //->middleware('auth');
Route::post('/profile/logout', [LogInController::class, 'logout'])->name('profile.logout'); //->middleware('auth');
Route::post('/profile/delete', [ProfileController::class, 'SoftDelete'])->name('profile.delete'); //->middleware('auth');
Route::post('/profile/modify', [ProfileController::class, 'Modify'])->name('profile.modify'); //->middleware('auth');
Route::post('/profile/{id}/restore', [ProfileController::class, 'restore']);

Route::get('/pay', [PayController::class, 'form'])->name('pay');
Route::post('/pay/verifyAuth', [PayController::class, 'dataVerify'])->name('pay.perform');


Route::get('/activities', [ActivityController::class, 'index'])->name('activities');
Route::post('/activities/details', [ActivityController::class, 'verifyAuth'])->name('activity.details');


//Route::get('/checkout', [OrderController::class, 'create'])->name('checkout.create');
//Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');


Route::middleware('auth')->group(function () 
{
    Route::get('/cart', [CartController::class, 'form'])->name('cart.index');
    Route::post('/cart/add', [CartController::class, 'addActivity'])->name('cart.add');
    Route::post('/cart/{id}/update', [CartController::class, 'updateQuantity'])->name('cart.update');
    Route::delete('/cart/{id}', [CartController::class, 'eliminateActivity'])->name('cart.destroy');
    Route::delete('/cart/clear', [CartController::class, 'clearCart'])->name('cart.clear');
});

Route::prefix('admin')->name('admin.')->group(function() 
{
    Route::get('/dashboard', [AdminController::class, 'dashboard'])->name('dashboard');
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    Route::get('/customers', [AdminController::class, 'customers'])->name('customers');
    Route::get('/activities', [AdminController::class, 'activities'])->name('activities');
    Route::get('/analytics', [AdminController::class, 'analytics'])->name('analytics');
});


Route::prefix('admin')
    //->middleware(['auth', 'admin'])
    ->name('admin.')
    ->group(function () {
        Route::resource('activities', AdminActivityController::class)
            ->except(['create','edit','show']); // only index/store/update/destroy
        //Route::resource('customers', AdminCustomerController::class)
            //->except(['create','edit','show']);

        
    });
Route::prefix('admin')
    ->name('admin.')
    ->group(function () {
        Route::resource('customers', AdminCustomerController::class)
            ->except(['create','edit','show']);
    });
Route::get('/activities', [UserActivitiesController::class, 'index'])->name('user.activities.index');

Route::get('dashboard', 'App\Http\Controllers\PayController@dashboard')->middleware('auth');

Route::post('/usuarios-masivo', [AdminController::class, 'createfromfile']);

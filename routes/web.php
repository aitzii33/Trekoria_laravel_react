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
use App\Http\Controllers\Admin\ActivityController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\Auth\ResetPasswordController;
use App\Http\Controllers\Admin\AdminController;


Route::get('/', [PageController::class, 'Landing'])->name('landing');
Route::get('/home', [PageController::class, 'Home'])->name('home');
Route::post('/activities', [PageController::class, 'Activities'])->name('activities');
Route::get('/about', [PageController::class, 'About'])->name('about');


Route::get('/contact', [ContactController::class, 'form'])->name('contact');
Route::post('/contact/send', [ContactController::class, 'send'])->name('contact.send');


Route::get('/login', [LogInController::class, 'form'])->name('login');
Route::post('/login/prove', [LogInController::class, 'login'])->name('login.perform');
Route::post('/logout', [LogInController::class, 'logout'])->name('logout');


Route::get('/forgotPass', [ForgotController::class, 'form'])->name('forgot');
Route::post('/sendEmail', [ForgotController::class, 'sendEmail'])->name('forgot.perform');


Route::get('/reset-password/{token}', [ResetPasswordController::class, 'showForm'])->name('password.reset');
Route::post('/reset-password', [ResetPasswordController::class, 'reset'])->name('password.update');

Route::get('/register', [RegisterController::class, 'form'])->name('register.form');
Route::post('/register/send', [RegisterController::class, 'sendEmail'])->name('register.send');
Route::get('/register/confirm/{token}', [RegisterController::class, 'confirm'])->name('register.confirm');


Route::get('/profile', [ProfileController::class, 'form'])->name('profile');
Route::post('/profile/delete', [ProfileController::class, 'SoftDelete'])->name('profile.delete')->middleware('auth');
Route::post('/profile/modify', [ProfileController::class, 'Modify'])->name('profile.modify')->middleware('auth');
Route::post('/profile/{id}/restore', [ProfileController::class, 'restore']);

Route::get('/pay', [PayController::class, 'form'])->name('pay');
Route::post('/pay/verifyAuth', [PayController::class, 'dataVerify'])->name('pay.perform');


Route::get('/activities', [ActivityController::class, 'index'])->name('activities');
Route::post('/activities/details', [ActivityController::class, 'verifyAuth'])->name('activity.details');


Route::get('/checkout', [OrderController::class, 'create'])->name('checkout.create');
Route::post('/checkout', [OrderController::class, 'store'])->name('checkout.store');


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

Route::prefix('admin')->name('admin.')->group(function () 
{
    Route::get('/bookings', [AdminController::class, 'bookings'])->name('bookings');
    Route::post('/bookings', [AdminController::class, 'storeBooking'])->name('bookings.store');
    Route::put('/bookings/{id}', [AdminController::class, 'updateBooking'])->name('bookings.update');
    Route::delete('/bookings/{id}', [AdminController::class, 'deleteBooking'])->name('bookings.delete');
});


Route::prefix('admin')->name('admin.')->group(function () 
{
    Route::get('/users', [AdminController::class, 'users'])->name('users');
    Route::post('/users', [AdminController::class, 'storeUser'])->name('users.store');
    Route::put('/users/{id}', [AdminController::class, 'updateUser'])->name('users.update');
    Route::delete('/users/{id}', [AdminController::class, 'deleteUser'])->name('users.delete');
});

/*Route::middleware(['auth', 'can:admin'])->group(function () 
{
    Route::get('/admin', [AdminController::class, 'index'])->name('admin.dashboard');
});
Route::prefix('admin')->name('admin.')->group(function () {
    Route::get('dashboard', fn() => inertia('Admin/Dashboard'))->name('dashboard');
});



Route::middleware(['auth', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    // Admin Dashboard (optional)
    Route::get('/dashboard', function () {
        return inertia('Admin/Dashboard');
    })->name('dashboard');

    // Resource routes for activities (CRUD)
    Route::resource('activities', ActivityController::class);
});*/

// Temporary design routes (no login)
Route::prefix('admin')->name('admin.')->group(function () {

    // Dashboard
    Route::get('dashboard', fn() => Inertia::render('Admin/Dashboard'))->name('dashboard');

    // Resource routes for Activities (full CRUD handled by controller)
    Route::resource('activities', ActivityController::class);

    // Other pages (just Inertia for now)
    Route::get('bookings', fn() => Inertia::render('Admin/Bookings'))->name('bookings');
    Route::get('customers', fn() => Inertia::render('Admin/Customers'))->name('customers');
    Route::get('analytics', fn() => Inertia::render('Admin/Analytics'))->name('analytics');
});



Route::get('dashboard', 'App\Http\Controllers\PayController@dashboard')->middleware('auth');

Route::post('/usuarios-masivo', [AdminController::class, 'createfromfile']);

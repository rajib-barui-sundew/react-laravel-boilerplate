<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
// Safely import the utility function.
require_once __DIR__ . '/base.php';
// Welcome route for admin (optional)
Route::get('/welcome', function () {
    return "Hello Admin, Welcome to the Admin API!";
});

// Admin authentication routes
Route::controller(AdminAuthController::class)->group(function () {
    Route::post('/login', 'login')->middleware('throttle:3,1')->name('admin.validateLogin');
    Route::post('/logout', 'logout')->name('admin.logout');
});

// More admin APIs can be added here...

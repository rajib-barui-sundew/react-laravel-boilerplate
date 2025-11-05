<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController as UserAuthController;

// Welcome route for user (optional)
Route::get('/welcome', function () {
    return "Hello User, Welcome to our API!";
});

// User authentication routes
Route::controller(UserAuthController::class)->group(function () {
    Route::post('/login', 'login')->middleware('throttle:3,1')->name('user.validateLogin');
    Route::post('/logout', 'logout')->name('user.logout');
});

// More user APIs can be added here...

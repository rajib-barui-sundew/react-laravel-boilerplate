<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Admin\AuthController as AdminAuthController;
use App\Http\Controllers\User\AuthController as UserAuthController;

Route::get('/welcome', function (Request $request) {
    return "Hello User, Welcome to our API!";
});

// Admin routes
Route::group(['prefix' => 'admin'], function () {
  Route::controller(AdminAuthController::class)->group(function () {
    Route::post('/login', 'login')->middleware('throttle:3,1')->name('admin.validateLogin');
    Route::post('/logout', 'logout')->name('admin.logout');
  });
});

// User routes
Route::controller(UserAuthController::class)->group(function () {
  Route::post('/login', 'login')->middleware('throttle:3,1')->name('user.validateLogin');
  Route::post('/logout', 'logout')->name('user.logout');
});

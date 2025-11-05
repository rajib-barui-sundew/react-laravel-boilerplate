<?php

use Illuminate\Support\Facades\Route;

// API Versioning - All routes are prefixed with 'v1'
Route::prefix('v1')->group(function () {
    Route::prefix('admin')->group(function () {
        require __DIR__ . '/v1/admin/admin.php';
    });
    require __DIR__ . '/v1/user/user.php';
    // Add other v1 route files here as the API expands
});

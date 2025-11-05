<?php

use Illuminate\Support\Facades\Route;
// Function to Amalgamate CRUD Routes
function registerCrudRoutes(array $entities, string $namespace)
{
  foreach ($entities as $prefix => $controller) {
    Route::prefix($prefix)->controller($controller)->group(function () use ($prefix, $namespace) {
      Route::get('/', 'index')->name("$namespace.$prefix");
      Route::get('/create', 'create')->name("$namespace.$prefix.create");
      Route::post('/', 'store')->name("$namespace.$prefix.store");

      Route::middleware('decodeHashid')->group(function () use ($prefix, $namespace) {
        Route::get('/{id}/edit', 'edit')->name("$namespace.$prefix.edit");
        Route::post('/{id}/update', 'update')->name("$namespace.$prefix.update");
        Route::post('/{id}/destroy', 'destroy')->name("$namespace.$prefix.delete");
        Route::post('/{id}/togglestatus', 'toggle')->name("$namespace.$prefix.edit.status");
      });
      Route::post('/multidestroy', 'multidestroy')->name("$namespace.$prefix.delete.multiple");

      Route::get('/export', function () {
        return response()->json(1);
      })->name("$namespace.$prefix.export");
    });
  }
}
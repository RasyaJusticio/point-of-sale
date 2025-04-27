<?php

use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ItemController;
use Illuminate\Support\Facades\Route;

Route::group(['middleware' => ['auth'], 'controller' => CategoryController::class], function () {
    Route::get('/categories', 'index')->name('categories.index');
    Route::get('/categories/create', 'create')->name('categories.create');
    Route::post('/categories', 'store')->name('categories.store');
    Route::get('/categories/{category}', 'show')->name('categories.show');
    Route::get('/categories/{category}/edit', 'edit')->name('categories.edit');
    Route::put('/categories/{category}', 'update')->name('categories.update');
    Route::delete('/categories/{category}', 'destroy')->name('categories.destroy');
});

Route::group(['middleware' => ['auth'], 'prefix' => 'items', 'controller' => ItemController::class], function () {
    Route::get('', 'index')->name('items.index');
    Route::get('create', 'create')->name('items.create');
    Route::post('', 'store')->name('items.store');

    Route::group(['prefix' => '{item}'], function () {
        Route::get('', 'show')->name('items.show');
        Route::get('edit', 'edit')->name('items.edit');
        Route::post('', 'update')->name('items.update');
        Route::delete('', 'destroy')->name('items.destroy');
    });
});

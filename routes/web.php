<?php

use App\Http\Controllers\BatchController;
use App\Http\Controllers\CentreController;
use App\Http\Controllers\DocumentController;
use App\Http\Controllers\FileController;
use App\Http\Controllers\PDFController;
use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

use App\Http\Controllers\UserController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::resource('/user', UserController::class);
    Route::resource('/centre', CentreController::class);
    Route::resource('/document', DocumentController::class);
    Route::resource('/batches', BatchController::class);

    // API Resource
    Route::apiResource('/files', FileController::class);
    Route::get('/api/generate-pdf', [PDFController::class, 'generatePDF'])->name('api.generate-pdf');
    Route::get('/api/download-pdf', [PDFController::class, 'downloadPDF'])->name('api.download-pdf');

});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';

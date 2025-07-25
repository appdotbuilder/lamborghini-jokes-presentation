<?php

use App\Http\Controllers\PresentationController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/health-check', function () {
    return response()->json([
        'status' => 'ok',
        'timestamp' => now()->toISOString(),
    ]);
})->name('health-check');

// Redirect root to login for unauthenticated users, or to presentation for authenticated users
Route::get('/', function () {
    if (auth()->check()) {
        return app(PresentationController::class)->index();
    }
    return redirect()->route('login');
})->name('home');

// Presentation routes - main functionality
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/presentation', [PresentationController::class, 'index'])->name('presentation.index');
    Route::post('/presentation', [PresentationController::class, 'store'])->name('presentation.store');
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

// Welcome page for non-authenticated users
Route::get('/welcome', function () {
    return Inertia::render('welcome');
})->name('welcome');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';

<?php

use App\Models\Room;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\DashboardController;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::middleware(["auth:sanctum"])->prefix("/dashboard")->group(function(){
    Route::get('/stats', [DashboardController::class, 'stats']);
    Route::get('/bookings-table', [DashboardController::class, 'bookingsTable']);

});
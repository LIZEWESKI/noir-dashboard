<?php

use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::middleware(['auth:sanctum'])->get('/user', function (Request $request) {
    return $request->user();
});
Route::get("/dashboard/stats", function(){
    $payment = Payment::all()->count();
    return response()->json(["total_booking" => $payment],200);
});
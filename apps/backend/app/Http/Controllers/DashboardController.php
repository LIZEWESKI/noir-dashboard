<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\Payment;
use App\Models\Reservation;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class DashboardController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function stats()
    {
        $now = Carbon::now();
        $firstDay = $now->copy()->startOfMonth();
        $lastDay  = $now->copy()->endOfMonth();

        $paymentStats = Payment::selectRaw('COUNT(*) as totalBooking, SUM(total_amount) as totalRevenue')
            ->where('payment_status', 'completed')
            ->whereBetween('created_at', [$firstDay, $lastDay])
            ->first();

        $roomsAvailable = Room::where('status', 'available')->count();

        $metrics = [
            (object)[
                "name"  => "Total bookings this month",
                "value" => (int)($paymentStats->totalBooking ?? 0),
                "type" => "number"
            ],
            (object)[
                "name"  => "Total revenue this month",
                "value" => number_format((float)$paymentStats->totalRevenue, 2, '.', ''),
                "type" => "currency"
            ],
            (object)[
                "name"  => "Rooms Available Today",
                "value" => (int)($roomsAvailable),
                "type" => "number"
            ]
            ];
        return response()->json($metrics, 200);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function bookingsTable()
    {
        $reservations = Reservation::select([
            'id',
            "user_id",
            "room_id",
            'check_in',
            'total_price',
            'status'
        ])
        ->with([
            'room:id,room_number',
            'user:id,name'
        ])
        ->latest()
        ->get();

        return response()->json($reservations, 200);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}

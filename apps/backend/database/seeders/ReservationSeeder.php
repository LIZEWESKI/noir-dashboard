<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Room;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $roomsCount = Room::count();
        
        $reservations = collect(range(1,$roomsCount))->map(fn($i) => [
            'user_id' => '1',
            'room_id' => $i,
            'check_in' => now()->format('Y-m-d'),
            'check_out' => now()->addDays(2)->format('Y-m-d'),
            'nights' => 3,
            'cleaning_fee' => 25,
            'service_fee' => 15,
            'total_price' => 245,
            'status' => 'active'
        ])->toArray();
        
        foreach ($reservations as $reservation) {
            $plucked_res = Reservation::create($reservation);
            $payment = Payment::factory()->create();
            // pluck('id') method lets you attach a collection it accepts id as a param (it'd loop over all the collection and pluck each id)
            $payment->reservations()->attach($plucked_res->id);
        }
    }
}

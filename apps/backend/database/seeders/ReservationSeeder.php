<?php

namespace Database\Seeders;

use App\Models\Payment;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\User;
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

        $random_num = rand(1,3);
        
        $reservations = collect(range(1,$roomsCount))->map(fn($i) => [
            'user_id' => User::factory(),
            'room_id' => $i,
            'check_in' => now()->addDays($random_num)->format('Y-m-d'),
            'check_out' => now()->addDays($random_num)->format('Y-m-d'),
            'nights' => 3,
            'cleaning_fee' => 25,
            'service_fee' => 15,
            'total_price' => 245,
            'status' => fake()->randomElement(["pending","active","cancelled"])
        ])->toArray();
        
        foreach ($reservations as $reservation) {
            $plucked_res = Reservation::create($reservation);
            $payment = Payment::factory()->create();
            // pluck('id') method lets you attach a collection it accepts id as a param 
            // (it'd loop over all the collection and/or array and pluck each id)
            $payment->reservations()->attach($plucked_res->id);
        }
    }
}

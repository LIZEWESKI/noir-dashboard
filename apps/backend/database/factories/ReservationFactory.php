<?php

namespace Database\Factories;

use App\Models\Room;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Reservation>
 */
class ReservationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $rand_day = rand(1,3);
        $check_in_date = now()->copy()->addDays($rand_day);
        $check_out_date = $check_in_date->copy()->addDays($rand_day);
        $nightsCount =(int) max(0, $check_in_date->diffInDays($check_out_date)); 

        return [
                'user_id' => User::factory(),
                'room_id' => rand(1,15),
                'check_in' => $check_in_date->format('Y-m-d'),
                'check_out' => $check_out_date->format('Y-m-d'),
                'nights' => $nightsCount,
                'cleaning_fee' => 25,
                'service_fee' => 15,
                'total_price' => fake()->randomFloat(2,115,390),
                'status' => fake()->randomElement(["pending","active","cancelled"])
        ];
    }
}

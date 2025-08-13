<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Payment>
 */
class PaymentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'user_id' => User::factory(),
            'total_amount' => rand(100,1000),
            'payment_status' => fake()->randomElement(["cancelled","completed"]),
            'payment_method' => fake()->randomElement(["paypal","debit card"]),
            'transaction_id' => Str::random(17),
        ];
    }
}

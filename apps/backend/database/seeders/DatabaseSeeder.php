<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Rick Sanchez',
            'email' => 'rick@admin.com',
            "password" => "12345678",
            "role" => "admin"
        ]);
        $this->call(RoomSeeder::class);
        $this->call(FeatureSeeder::class);
        $this->call(FeatureRoomSeeder::class);
        $this->call(ReservationSeeder::class);
    }

}

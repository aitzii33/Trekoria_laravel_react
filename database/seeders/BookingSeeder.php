<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Disponibility;
use App\Models\User;
use Illuminate\Database\Seeder;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allUsers = User::all();
        $allDisponibilities = Disponibility::all();

        if ($allUsers->isEmpty() || $allDisponibilities->isEmpty()) 
        {
            $this->command->info('No users or disponibilities found. Please seed Users and Disponibilities first.');
            return;
        }

        foreach ($allDisponibilities as $availability) 
        {
            $numBookings = rand(0, $availability->total_people);

            for ($i = 0; $i < $numBookings; $i++) 
            {
                $user = $allUsers->random();
                $guide = $availability->activity->guides()->inRandomOrder()->first();

                $people = rand(1, max(1, $availability->total_people - $availability->reserve_people));

                Booking::create([
                    'availability_id' => $availability->id,
                    'user_id' => $user->id,
                    'guide_id' => $guide?->id,
                    'people' => $people,
                    'total_price' => $people * ($guide->price ?? 0),
                    'status' => ['pending', 'paid', 'cancelled'][rand(0, 2)],
                ]);

                $availability->reserve_people += $people;
                $availability->save();
            }
        }

        $this->command->info('Bookings seeded successfully!');
    }
}

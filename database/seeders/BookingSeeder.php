<?php

namespace Database\Seeders;

use App\Models\Booking;
use App\Models\Disponibility;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class BookingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();
        $disp = Disponibility::with('activity.guides')->get();

        if ($users->isEmpty() || $disp->isEmpty()) 
        {
            $this->command->warn('Seed Users and Disponibilities first.');
            return;
        }

        foreach ($disp as $availability) 
        {

            $remaining = $availability->total_people - $availability->reserve_people;

            if ($remaining <= 0) 
            {
                continue;
            }

            $bookingsToCreate = rand(1, min(3, $remaining));

            for ($i = 0; $i < $bookingsToCreate; $i++) 
            {

                $remaining = $availability->total_people - $availability->reserve_people;

                if ($remaining <= 0) {
                    break;
                }

                $user = $users->random();
                $guide = $availability->activity->guides->random() ?? null;

                $people = rand(1, $remaining);
                $price = $guide?->price ?? $availability->activity->price ?? 0;

                DB::transaction(function () use ($availability, $user, $guide, $people, $price) {

                    Booking::create([
                        'availability_id' => $availability->id,
                        'user_id' => $user->id,
                        'guide_id' => $guide?->id,
                        'people' => $people,
                        'total_price' => $people * $price,
                        'status' => collect(['pending', 'paid', 'cancelled'])->random(),
                    ]);

                    $availability->increment('reserve_people', $people);
                });
            }
        }

        $this->command->info('Bookings seeded successfully.');
    }
}

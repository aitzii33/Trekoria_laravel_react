<?php

namespace Database\Seeders;

use App\Models\Availability;
use App\Models\TimeSchedule;
use Carbon\Carbon;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class AvailabilitySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allSchedules = TimeSchedule::all();

        if ($allSchedules->isEmpty()) 
        {
            $this->command->info('No time schedules found. Please seed TimeSchedules first.');
            return;
        }

        foreach ($allSchedules as $schedule) 
        {
            for ($dayOffset = 0; $dayOffset < 7; $dayOffset++) 
            {
                $date = Carbon::today()->addDays($dayOffset);

                if ($date->dayOfWeek == $schedule->day_of_week) 
                {
                    Availability::create([
                        'time_schedule_id' => $schedule->id,
                        'date' => $date->toDateString(),
                        'capacity' => rand(5, 20), 
                        'reserved' => 0,
                    ]);
                }
            }
        }

        $this->command->info('Availabilities seeded successfully!');

    }
}

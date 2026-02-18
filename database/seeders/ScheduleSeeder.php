<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\TimeSchedule;
use Illuminate\Database\Seeder;

class ScheduleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $allActivities = Activity::all();

        if ($allActivities->isEmpty()) 
        {
            $this->command->info('No activities found. Please seed Activities first.');
            return;
        }

        foreach ($allActivities as $activity) 
        {
            $numSchedules = rand(2, 5);

            for ($i = 0; $i < $numSchedules; $i++) 
            {
                TimeSchedule::create([
                    'id_activity' => $activity->id,
                    'day_of_week' => rand(0, 6), // 0 = Sunday, 6 = Saturday
                    'start_time' => sprintf('%02d:%02d:00', rand(8, 18), [0, 15, 30, 45][array_rand([0,15,30,45])]),
                ]);
            }
        }

        $this->command->info('Time schedules seeded successfully!');
    }
}

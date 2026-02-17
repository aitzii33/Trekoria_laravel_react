<?php

namespace Database\Seeders;

use App\Models\Disponibility;
use App\Models\TimeSchedule;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DisponibilitySeeder extends Seeder
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
            $totalPeople = rand(5, 20);
            $reservePeople = rand(0, $totalPeople);

            Disponibility::create([
                'id_time' => $schedule->id,
                'total_people' => $totalPeople,
                'reserve_people' => $reservePeople,
            ]);
        }

        $this->command->info('Disponibility seeded successfully!');
    }
}

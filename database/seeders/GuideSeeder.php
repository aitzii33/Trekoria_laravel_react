<?php

namespace Database\Seeders;

use App\Models\Activity;
use App\Models\Guides;
use Illuminate\Database\Seeder;

class GuideSeeder extends Seeder
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
            $numGuides = rand(1, 3);

            for ($i = 0; $i < $numGuides; $i++) 
            {
                Guides::create([
                    'activity_id' => $activity->id,
                    'name' => 'Guide ' . ucfirst(substr(md5(rand()), 0, 5)),
                    'price' => rand(20, 100), 
                    'description' => 'Professional guide for ' . $activity->name . '.',
                ]);
            }
        }

        $this->command->info('Guides seeded successfully!');
    }
}

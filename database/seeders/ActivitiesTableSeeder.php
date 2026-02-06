<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity; // your Activities model
use App\Models\Places;     // your Places model

class ActivitiesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Make sure there are places
        $allPlaces = Places::all();

        if ($allPlaces->isEmpty()) {
            $this->command->info('No places found. Please seed Places first.');
            return;
        }

        // Example dummy activities
        $activitiesData = [
            [
                'name' => 'Ride a Horse',
                'description' => 'Group of 5 persons with an instructor. Duration: 40 minutes.',
                'price' => 50,
                'is_active' => true,
            ],
            [
                'name' => 'Hiking Adventure',
                'description' => 'Guided mountain hiking tour.',
                'price' => 60,
                'is_active' => true,
            ],
            [
                'name' => 'City Walking Tour',
                'description' => 'Discover hidden gems in the city.',
                'price' => 25,
                'is_active' => true,
            ],
            [
                'name' => 'Kayaking',
                'description' => 'Enjoy 2 hours of kayaking on the lake.',
                'price' => 40,
                'is_active' => true,
            ],
            [
                'name' => 'Cycling Tour',
                'description' => 'Guided cycling tour around the city.',
                'price' => 35,
                'is_active' => true,
            ],
        ];

        // Loop through dummy data and assign random place
        foreach ($activitiesData as $activity) {
            $place = $allPlaces->random();

            Activity::create(array_merge($activity, [
                'place_id' => $place->id,
                'location' => $place->city, // optional: set location as the city name
            ]));
        }

        $this->command->info('Activities seeded successfully!');
    }
}

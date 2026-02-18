<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity; 
use App\Models\Places;  

class ActivitiesTableSeeder extends Seeder
{
    public function run(): void
    {
        $allPlaces = Places::all();

        if ($allPlaces->isEmpty()) 
        {
            $this->command->info('No places found. Please seed Places first.');
            return;
        }

        $activitiesData = [
            [
                'name' => 'Ride a Horse',
                'description' => 'Group of 5 persons with an instructor. Duration: 40 minutes.',
                'price' => 50.00,
                'is_active' => true,
            ],
            [
                'name' => 'Hiking Adventure',
                'description' => 'Guided mountain hiking tour. Includes snacks and safety gear.',
                'price' => 60.00,
                'is_active' => true,
            ],
            [
                'name' => 'City Walking Tour',
                'description' => 'Discover hidden gems in the city with a professional guide.',
                'price' => 25.00,
                'is_active' => true,
            ],
            [
                'name' => 'Kayaking',
                'description' => 'Enjoy 2 hours of kayaking on the lake. Life jackets included.',
                'price' => 40.00,
                'is_active' => true,
            ],
            [
                'name' => 'Cycling Tour',
                'description' => 'Guided cycling tour around the city. Bikes provided.',
                'price' => 35.00,
                'is_active' => true,
            ],
        ];

        foreach ($activitiesData as $activity)
        {
            $place = $allPlaces->random();

            Activity::create(array_merge($activity, [
                'place_id' => $place->id,
                'location' => $place->city ?? 'Unknown', 
                'imagen' => null, 
                'lat' => $place->lat ?? null,
                'lng' => $place->lng ?? null,
                'distance' => rand(1, 20), // km
                'duration' => rand(30, 180) * 60, // segundos
                'avg_speed' => rand(5, 20), // km/h
                'elevation_gain' => rand(50, 500), // metros
                'track_points' => json_encode([
                    ['lat' => $place->lat ?? 0, 'lng' => $place->lng ?? 0],
                    ['lat' => ($place->lat ?? 0) + 0.01, 'lng' => ($place->lng ?? 0) + 0.01],
                    ['lat' => ($place->lat ?? 0) + 0.02, 'lng' => ($place->lng ?? 0) + 0.02],
                ]),
                'completed_at' => now(),
            ]));
        }

        $this->command->info('Activities seeded successfully!');
    }
}

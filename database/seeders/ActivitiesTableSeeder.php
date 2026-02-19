<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Activity;
use App\Models\Places; // your Places model

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

        // Example dummy activities (50+)
        $activitiesData = [
    ['name' => 'Ride a Horse', 'description' => 'Group of 5 persons with an instructor. Duration: 40 minutes.', 'price' => 50, 'date' => '2026-03-01', 'is_active' => true],
    ['name' => 'Hiking Adventure', 'description' => 'Guided mountain hiking tour.', 'price' => 60, 'date' => '2026-03-02', 'is_active' => true],
    ['name' => 'City Walking Tour', 'description' => 'Discover hidden gems in the city.', 'price' => 25, 'date' => '2026-03-03', 'is_active' => true],
    ['name' => 'Kayaking', 'description' => 'Enjoy 2 hours of kayaking on the lake.', 'price' => 40, 'date' => '2026-03-04', 'is_active' => true],
    ['name' => 'Cycling Tour', 'description' => 'Guided cycling tour around the city.', 'price' => 35, 'date' => '2026-03-05', 'is_active' => true],
    ['name' => 'Boat Cruise', 'description' => 'Relaxing cruise along the river.', 'price' => 45, 'date' => '2026-03-06', 'is_active' => true],
    ['name' => 'Wine Tasting', 'description' => 'Sample the best local wines.', 'price' => 55, 'date' => '2026-03-07', 'is_active' => true],
    ['name' => 'Cooking Class', 'description' => 'Learn to cook traditional dishes.', 'price' => 50, 'date' => '2026-03-08', 'is_active' => true],
    ['name' => 'Snorkeling', 'description' => 'Explore underwater reefs.', 'price' => 65, 'date' => '2026-03-09', 'is_active' => true],
    ['name' => 'Scuba Diving', 'description' => 'Guided scuba diving for beginners.', 'price' => 80, 'date' => '2026-03-10', 'is_active' => true],
    ['name' => 'Rock Climbing', 'description' => 'Adventure on natural rock formations.', 'price' => 70, 'date' => '2026-03-11', 'is_active' => true],
    ['name' => 'Paragliding', 'description' => 'Fly over the mountains.', 'price' => 120, 'date' => '2026-03-12', 'is_active' => true],
    ['name' => 'Skiing', 'description' => 'Ski slopes with professional guidance.', 'price' => 90, 'date' => '2026-03-13', 'is_active' => true],
    ['name' => 'Snowboarding', 'description' => 'Snowboarding for all levels.', 'price' => 85, 'date' => '2026-03-14', 'is_active' => true],
    ['name' => 'Zip Lining', 'description' => 'Adventure zip line experience.', 'price' => 45, 'date' => '2026-03-15', 'is_active' => true],
    ['name' => 'Cultural Tour', 'description' => 'Visit historic landmarks.', 'price' => 30, 'date' => '2026-03-16', 'is_active' => true],
    ['name' => 'Photography Tour', 'description' => 'Capture beautiful cityscapes.', 'price' => 35, 'date' => '2026-03-17', 'is_active' => true],
    ['name' => 'Bird Watching', 'description' => 'Guided tour in nature reserves.', 'price' => 25, 'date' => '2026-03-18', 'is_active' => true],
    ['name' => 'Fishing Trip', 'description' => 'Catch local fish with a guide.', 'price' => 40, 'date' => '2026-03-19', 'is_active' => true],
    ['name' => 'Kayak Safari', 'description' => 'Explore rivers and lakes.', 'price' => 50, 'date' => '2026-03-20', 'is_active' => true],
    ['name' => 'Mountain Biking', 'description' => 'Thrilling trails on mountain paths.', 'price' => 60, 'date' => '2026-03-21', 'is_active' => true],
    ['name' => 'Hot Air Balloon Ride', 'description' => 'Experience the sunrise from above.', 'price' => 150, 'date' => '2026-03-22', 'is_active' => true],
    ['name' => 'Cave Exploration', 'description' => 'Guided tour inside caves.', 'price' => 55, 'date' => '2026-03-23', 'is_active' => true],
    ['name' => 'Horse Carriage Ride', 'description' => 'Relaxing carriage through the city.', 'price' => 30, 'date' => '2026-03-24', 'is_active' => true],
    ['name' => 'Museum Tour', 'description' => 'Learn history and art.', 'price' => 20, 'date' => '2026-03-25', 'is_active' => true],
    ['name' => 'Street Art Tour', 'description' => 'Discover city murals and graffiti.', 'price' => 25, 'date' => '2026-03-26', 'is_active' => true],
    ['name' => 'Yoga Class', 'description' => 'Outdoor yoga in scenic areas.', 'price' => 15, 'date' => '2026-03-27', 'is_active' => true],
    ['name' => 'Meditation Session', 'description' => 'Guided meditation in nature.', 'price' => 10, 'date' => '2026-03-28', 'is_active' => true],
    ['name' => 'Local Market Tour', 'description' => 'Discover local food and crafts.', 'price' => 20, 'date' => '2026-03-29', 'is_active' => true],
    ['name' => 'Historical Walking Tour', 'description' => 'Explore city history with a guide.', 'price' => 25, 'date' => '2026-03-30', 'is_active' => true],
    ['name' => 'Sunset Cruise', 'description' => 'Evening boat ride to watch the sunset.', 'price' => 50, 'date' => '2026-03-31', 'is_active' => true],
    ['name' => 'Jet Ski Adventure', 'description' => 'Fast-paced water adventure.', 'price' => 70, 'date' => '2026-04-01', 'is_active' => true],
    ['name' => 'Surfing Lesson', 'description' => 'Learn surfing from instructors.', 'price' => 60, 'date' => '2026-04-02', 'is_active' => true],
    ['name' => 'Snorkeling Safari', 'description' => 'Guided snorkeling in coral reefs.', 'price' => 65, 'date' => '2026-04-03', 'is_active' => true],
    ['name' => 'Trekking Challenge', 'description' => 'Full-day mountain trekking.', 'price' => 75, 'date' => '2026-04-04', 'is_active' => true],
    ['name' => 'Rocky Mountain Hike', 'description' => 'Challenging hike through rocky terrain.', 'price' => 80, 'date' => '2026-04-05', 'is_active' => true],
    ['name' => 'Desert Safari', 'description' => 'Explore the desert in 4x4 vehicles.', 'price' => 90, 'date' => '2026-04-06', 'is_active' => true],
    ['name' => 'Glacier Walk', 'description' => 'Guided trek on a glacier.', 'price' => 100, 'date' => '2026-04-07', 'is_active' => true],
    ['name' => 'Island Hopping', 'description' => 'Visit multiple islands by boat.', 'price' => 120, 'date' => '2026-04-08', 'is_active' => true],
    ['name' => 'Cultural Dance Class', 'description' => 'Learn traditional dances.', 'price' => 35, 'date' => '2026-04-09', 'is_active' => true],
    ['name' => 'Pottery Workshop', 'description' => 'Create your own pottery.', 'price' => 40, 'date' => '2026-04-10', 'is_active' => true],
    ['name' => 'Photography Workshop', 'description' => 'Learn photography tips from pros.', 'price' => 50, 'date' => '2026-04-11', 'is_active' => true],
    ['name' => 'Wildlife Safari', 'description' => 'Observe wildlife in natural habitats.', 'price' => 120, 'date' => '2026-04-12', 'is_active' => true],
    ['name' => 'Cooking Experience', 'description' => 'Cook with local chefs.', 'price' => 60, 'date' => '2026-04-13', 'is_active' => true],
    ['name' => 'Chocolate Tasting', 'description' => 'Sample exquisite chocolates.', 'price' => 30, 'date' => '2026-04-14', 'is_active' => true],
    ['name' => 'Cheese Tasting', 'description' => 'Discover the best local cheeses.', 'price' => 30, 'date' => '2026-04-15', 'is_active' => true],
    ['name' => 'Bike and Brew Tour', 'description' => 'Cycle and enjoy local craft beers.', 'price' => 45, 'date' => '2026-04-16', 'is_active' => true],
    ['name' => 'Fishing Safari', 'description' => 'Full-day guided fishing tour.', 'price' => 70, 'date' => '2026-04-17', 'is_active' => true],
    ['name' => 'Horseback Safari', 'description' => 'Ride through natural reserves.', 'price' => 80, 'date' => '2026-04-18', 'is_active' => true],
    ['name' => 'Sunrise Trek', 'description' => 'Morning trek to catch the sunrise.', 'price' => 40, 'date' => '2026-04-19', 'is_active' => true],
    ['name' => 'Night Safari', 'description' => 'Explore nocturnal wildlife.', 'price' => 90, 'date' => '2026-04-20', 'is_active' => true],
    ['name' => 'River Rafting', 'description' => 'Exciting white-water rafting.', 'price' => 65, 'date' => '2026-04-21', 'is_active' => true],
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

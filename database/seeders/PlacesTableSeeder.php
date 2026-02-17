<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Places;

class PlacesTableSeeder extends Seeder
{
    public function run(): void
    {
        $places = [
            ['city' => 'Madrid', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Paris', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Tokyo', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Cape Town', 'country' => 'South Africa', 'continent' => 'Africa'],
            ['city' => 'New York', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'London', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Sydney', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Rio de Janeiro', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'Moscow', 'country' => 'Russia', 'continent' => 'Europe'],
            ['city' => 'Beijing', 'country' => 'China', 'continent' => 'Asia'],
            ['city' => 'Berlin', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Rome', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Toronto', 'country' => 'Canada', 'continent' => 'North America'],
            ['city' => 'Dubai', 'country' => 'UAE', 'continent' => 'Asia'],
            ['city' => 'Singapore', 'country' => 'Singapore', 'continent' => 'Asia'],
            ['city' => 'Bangkok', 'country' => 'Thailand', 'continent' => 'Asia'],
            ['city' => 'Istanbul', 'country' => 'Turkey', 'continent' => 'Europe'],
            ['city' => 'Lisbon', 'country' => 'Portugal', 'continent' => 'Europe'],
            ['city' => 'Seoul', 'country' => 'South Korea', 'continent' => 'Asia'],
            ['city' => 'Buenos Aires', 'country' => 'Argentina', 'continent' => 'South America'],
            ['city' => 'Mexico City', 'country' => 'Mexico', 'continent' => 'North America'],
            ['city' => 'Cairo', 'country' => 'Egypt', 'continent' => 'Africa'],
            ['city' => 'Jakarta', 'country' => 'Indonesia', 'continent' => 'Asia'],
            ['city' => 'Lagos', 'country' => 'Nigeria', 'continent' => 'Africa'],
            ['city' => 'Vienna', 'country' => 'Austria', 'continent' => 'Europe'],
            ['city' => 'Helsinki', 'country' => 'Finland', 'continent' => 'Europe'],
            ['city' => 'Athens', 'country' => 'Greece', 'continent' => 'Europe'],
            ['city' => 'Warsaw', 'country' => 'Poland', 'continent' => 'Europe'],
            ['city' => 'Oslo', 'country' => 'Norway', 'continent' => 'Europe'],
            ['city' => 'Stockholm', 'country' => 'Sweden', 'continent' => 'Europe'],
            ['city' => 'Zurich', 'country' => 'Switzerland', 'continent' => 'Europe'],
            ['city' => 'Edinburgh', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Prague', 'country' => 'Czech Republic', 'continent' => 'Europe'],
            ['city' => 'Budapest', 'country' => 'Hungary', 'continent' => 'Europe'],
            ['city' => 'Kuala Lumpur', 'country' => 'Malaysia', 'continent' => 'Asia'],
            ['city' => 'Hong Kong', 'country' => 'China', 'continent' => 'Asia'],
            ['city' => 'Mumbai', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Delhi', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Manila', 'country' => 'Philippines', 'continent' => 'Asia'],
            ['city' => 'Hanoi', 'country' => 'Vietnam', 'continent' => 'Asia'],
            ['city' => 'Lima', 'country' => 'Peru', 'continent' => 'South America'],
            ['city' => 'Santiago', 'country' => 'Chile', 'continent' => 'South America'],
            ['city' => 'Bogota', 'country' => 'Colombia', 'continent' => 'South America'],
            ['city' => 'San Francisco', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Los Angeles', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Chicago', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Houston', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Miami', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Melbourne', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Perth', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Auckland', 'country' => 'New Zealand', 'continent' => 'Australia'],
            ['city' => 'Honolulu', 'country' => 'USA', 'continent' => 'North America'],
        ];

        foreach ($places as $p) {
            Places::firstOrCreate($p);
        }
    }
}

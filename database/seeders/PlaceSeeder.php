<?php

namespace Database\Seeders;

use App\Models\Places;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PlaceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
         $placesData = [
            [
                'city' => 'Paris',
                'country' => 'France',
                'continent' => 'Europe',
                'imagen' => null,
            ],
            [
                'city' => 'New York',
                'country' => 'United States',
                'continent' => 'North America',
                'imagen' => null,
            ],
            [
                'city' => 'Tokyo',
                'country' => 'Japan',
                'continent' => 'Asia',
                'imagen' => null,
            ],
            [
                'city' => 'Rio de Janeiro',
                'country' => 'Brazil',
                'continent' => 'South America',
                'imagen' => null,
            ],
            [
                'city' => 'Sydney',
                'country' => 'Australia',
                'continent' => 'Oceania',
                'imagen' => null,
            ],
            [
                'city' => 'Cairo',
                'country' => 'Egypt',
                'continent' => 'Africa',
                'imagen' => null,
            ],
            [
                'city' => 'Barcelona',
                'country' => 'Spain',
                'continent' => 'Europe',
                'imagen' => null,
            ],
            [
                'city' => 'London',
                'country' => 'United Kingdom',
                'continent' => 'Europe',
                'imagen' => null,
            ],
            [
                'city' => 'Los Angeles',
                'country' => 'United States',
                'continent' => 'North America',
                'imagen' => null,
            ],
            [
                'city' => 'Cape Town',
                'country' => 'South Africa',
                'continent' => 'Africa',
                'imagen' => null,
            ],
        ];

        foreach ($placesData as $place) 
        {
            Places::create($place);
        }

        $this->command->info('Places seeded successfully!');
    }
}

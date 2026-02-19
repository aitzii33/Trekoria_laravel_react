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
            ['city' => 'Barcelona', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Valencia', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Seville', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Paris', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Lyon', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Marseille', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Nice', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Tokyo', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Osaka', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Kyoto', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Nagoya', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'New York', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Los Angeles', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Chicago', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Houston', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'London', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Manchester', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Liverpool', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Birmingham', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Sydney', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Melbourne', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Brisbane', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Perth', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Toronto', 'country' => 'Canada', 'continent' => 'North America'],
            ['city' => 'Vancouver', 'country' => 'Canada', 'continent' => 'North America'],
            ['city' => 'Montreal', 'country' => 'Canada', 'continent' => 'North America'],
            ['city' => 'Calgary', 'country' => 'Canada', 'continent' => 'North America'],
            ['city' => 'Rio de Janeiro', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'São Paulo', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'Brasília', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'Salvador', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'Mumbai', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Delhi', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Bangalore', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Hyderabad', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Beijing', 'country' => 'China', 'continent' => 'Asia'],
            ['city' => 'Shanghai', 'country' => 'China', 'continent' => 'Asia'],
            ['city' => 'Guangzhou', 'country' => 'China', 'continent' => 'Asia'],
            ['city' => 'Shenzhen', 'country' => 'China', 'continent' => 'Asia'],
            ['city' => 'Berlin', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Munich', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Frankfurt', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Hamburg', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Rome', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Milan', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Naples', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Turin', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Seoul', 'country' => 'South Korea', 'continent' => 'Asia'],
            ['city' => 'Busan', 'country' => 'South Korea', 'continent' => 'Asia'],
            ['city' => 'Incheon', 'country' => 'South Korea', 'continent' => 'Asia'],
            ['city' => 'Daegu', 'country' => 'South Korea', 'continent' => 'Asia'],
            ['city' => 'Moscow', 'country' => 'Russia', 'continent' => 'Europe'],
            ['city' => 'Saint Petersburg', 'country' => 'Russia', 'continent' => 'Europe'],
            ['city' => 'Novosibirsk', 'country' => 'Russia', 'continent' => 'Europe'],
            ['city' => 'Yekaterinburg', 'country' => 'Russia', 'continent' => 'Europe'],
            ['city' => 'Philadelphia', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Phoenix', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'San Diego', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Dallas', 'country' => 'USA', 'continent' => 'North America'],
            ['city' => 'Leeds', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Glasgow', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Sheffield', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Bristol', 'country' => 'UK', 'continent' => 'Europe'],
            ['city' => 'Adelaide', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Canberra', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Darwin', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Hobart', 'country' => 'Australia', 'continent' => 'Australia'],
            ['city' => 'Sapporo', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Fukuoka', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Kobe', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Hiroshima', 'country' => 'Japan', 'continent' => 'Asia'],
            ['city' => 'Toulouse', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Nice', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Nantes', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Strasbourg', 'country' => 'France', 'continent' => 'Europe'],
            ['city' => 'Bilbao', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Granada', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Malaga', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Zaragoza', 'country' => 'Spain', 'continent' => 'Europe'],
            ['city' => 'Cologne', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Stuttgart', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Düsseldorf', 'country' => 'Germany', 'continent' => 'Europe'],
            ['city' => 'Dortmund', 'country' => 'Germany', 'continent' => 'Europe'],

            // Italy (additional)
            ['city' => 'Florence', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Venice', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Bologna', 'country' => 'Italy', 'continent' => 'Europe'],
            ['city' => 'Genoa', 'country' => 'Italy', 'continent' => 'Europe'],

            // India (additional)
            ['city' => 'Kolkata', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Chennai', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Pune', 'country' => 'India', 'continent' => 'Asia'],
            ['city' => 'Ahmedabad', 'country' => 'India', 'continent' => 'Asia'],

            // Brazil (additional)
            ['city' => 'Fortaleza', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'Curitiba', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'Recife', 'country' => 'Brazil', 'continent' => 'South America'],
            ['city' => 'Porto Alegre', 'country' => 'Brazil', 'continent' => 'South America'],

        ];

        foreach ($places as $p) {
            Places::firstOrCreate($p);
        }

        $this->command->info('Places seeded successfully!');
    } }


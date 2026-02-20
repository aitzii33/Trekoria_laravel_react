<?php

namespace Database\Seeders;

use Database\Seeders\ActivitiesTableSeeder;
use Database\Seeders\BookingSeeder;
use Database\Seeders\CartSeeder;
use Database\Seeders\DisponibilitySeeder;
use Database\Seeders\GuideSeeder;
use Database\Seeders\OrderSeeder;
use Database\Seeders\PlaceSeeder;
use Database\Seeders\ScheduleSeeder;
use Database\Seeders\TypeUserSeeder;
use Database\Seeders\UserSeeder;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call(TypeUserSeeder::class);
        $this->call(UserSeeder::class);

        $this->call(PlaceSeeder::class);
        $this->call(ActivitiesTableSeeder::class);
        $this->call(ScheduleSeeder::class);
        //$this->call(DisponibilitySeeder::class);
        
        
        //$this->call(BookingSeeder::class);
        $this->call(CartSeeder::class);
        
        $this->call(GuideSeeder::class);
        //$this->call(OrderSeeder::class);        
    }
}

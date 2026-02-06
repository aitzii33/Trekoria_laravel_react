<?php

namespace Database\Seeders;

use App\Models\Cart;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Guides;
use App\Models\Orders;
use App\Models\Places;
use App\Models\Activity;
use App\Models\TypeUsers;
use App\Models\TimeSchedule;
use App\Models\PasswordUsers;
use App\Models\Disponibilities;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
     {
        // Seed user types first (Admin/User)
        $this->call([
            TypeUserSeeder::class,
            PlacesTableSeeder::class,
            ActivitiesTableSeeder::class,
        ]);
     
    }
}

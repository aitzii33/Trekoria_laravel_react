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

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        User::factory(40)->create();

        // 1. Create admin/test user FIRST
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'password' => Hash::make('password'), // Hash the password!
                'email_verified_at' => now(),
            ]
        );

        // 2. Seed lookup/reference tables (no dependencies)
        TypeUsers::factory(40)->create();
        Places::factory(40)->create();
        TimeSchedule::factory(40)->create();
        PasswordUsers::factory(40)->create();

        // 3. Seed users (may depend on TypeUsers)
        User::factory(40)->create();

        // 4. Seed related tables LAST (depend on users/places/etc.)
        Activity::factory(40)->create();
        Cart::factory(40)->create();
        Disponibilities::factory(40)->create();
        Guides::factory(40)->create();
        Orders::factory(40)->create();
    }

}

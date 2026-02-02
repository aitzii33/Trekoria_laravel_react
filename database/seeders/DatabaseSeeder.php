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
        TypeUsers::firstOrCreate(['type_user' => 'Admin']);
        TypeUsers::firstOrCreate(['type_user' => 'User']);

        Places::create([
            'city' => 'Madrid', 
            'country' => 'Spain', 
            'continent' => 'Europe'
        ]);
        

        User::create(
        ['email' => 'shannon@example.com'],
        [
            'name' => 'Shannon',
            'last_name' => 'Doe',
            'user_name' => 'testuser',
            'birth_day' => '1998-05-12',
            'type_user' => 1,
            'image' => '../img/Girl.avif',
            'password' => Hash::make('12345'),
        ]);
        
        User::factory(40)->create();
    }
}

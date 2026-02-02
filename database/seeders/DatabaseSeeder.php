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
        TypeUsers::create(['name' => 'Admin']);
        TypeUsers::create(['name' => 'User']);
        
        Places::create([
            'city' => 'Madrid', 
            'country' => 'Spain', 
            'continent' => 'Europe'
        ]);
        
        User::firstOrCreate(
            ['email' => 'test@example.com'],
            [
                'name' => 'Test User',
                'surname' => 'Test',
                'username' => 'testuser',
                'type_user' => 1,
                'birth_day' => '1990-01-01',
                'password' => Hash::make('password'),
            ]
        );
        
        User::factory(40)->create();
    }
}

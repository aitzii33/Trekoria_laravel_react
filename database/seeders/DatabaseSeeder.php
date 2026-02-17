<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use App\Models\User;
use App\Models\Places;
use App\Models\TypeUsers;
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

        Activities::create([
            'place_id' => 1,
            'name' => 'ride a horse',
            'description' => 'It would be a group of 5 persons and a instructore. This activity has a 40 minutes of duration.',
            'location' => 'C. de Medellín, nº10, 4º-1',
        ]);

        User::create(
        ['email' => 'shannon@example.com'],
        [
            'name' => 'Shannon',
            'last_name' => 'Doe',
            'user_name' => 'testuser',
            'birth_day' => '1998-05-12',
            'type_user' => 1,
            'password' => Hash::make('12345'),
        ]);
    }
}

<?php

namespace Database\Seeders;

use App\Models\PasswordUsers;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Foundation\Auth\User;
use Illuminate\Support\Facades\Hash;

class PasswordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = User::all();

        foreach ($users as $user) 
        {
            PasswordUsers::create([
                'user_id' => $user->id,
                'password' => Hash::make('12345678'), // contraseña inicial de ejemplo
            ]);
        }
    }
}

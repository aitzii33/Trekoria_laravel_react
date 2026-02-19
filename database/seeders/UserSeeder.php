<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\PasswordUsers;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Shannon',
                'last_name' => 'Doe',
                'user_name' => 'sdoe',
                'email' => 'shannon.doe@example.com',
                'birth_day' => '1990-05-12',
                'image' => null,
                'type_user_id' => 1,
                'pending_token' => null,
                'pending_until' => null,
                'is_pending' => false,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'María',
                'last_name' => 'López',
                'user_name' => 'mlopez',
                'email' => 'maria.lopez@example.com',
                'birth_day' => '1988-11-23',
                'image' => null,
                'type_user_id' => 2,
                'pending_token' => null,
                'pending_until' => null,
                'is_pending' => false,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Laura',
                'last_name' => 'Martínez',
                'user_name' => 'lmartinez',
                'email' => 'laura.martinez@example.com',
                'birth_day' => '1995-02-14',
                'image' => null,
                'type_user_id' => 1,
                'pending_token' => Str::uuid(),
                'pending_until' => now()->addDays(3),
                'is_pending' => true,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Juan',
                'last_name' => 'Pérez',
                'user_name' => 'jperez',
                'email' => 'juan.perez@example.com',
                'birth_day' => '1992-07-06',
                'image' => null,
                'type_user_id' => 2,
                'pending_token' => null,
                'pending_until' => null,
                'is_pending' => false,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Sofía',
                'last_name' => 'Fernández',
                'user_name' => 'sofiaf',
                'email' => 'sofia.fernandez@example.com',
                'birth_day' => '2000-09-19',
                'image' => null,
                'type_user_id' => 1,
                'pending_token' => Str::uuid(),
                'pending_until' => now()->addDays(5),
                'is_pending' => true,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Luis',
                'last_name' => 'Ramírez',
                'user_name' => 'lramirez',
                'email' => 'luis.ramirez@example.com',
                'birth_day' => '1985-03-30',
                'image' => null,
                'type_user_id' => 2,
                'pending_token' => null,
                'pending_until' => null,
                'is_pending' => false,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Ana',
                'last_name' => 'González',
                'user_name' => 'agonzalez',
                'email' => 'ana.gonzalez@example.com',
                'birth_day' => '1998-12-01',
                'image' => null,
                'type_user_id' => 1,
                'pending_token' => Str::uuid(),
                'pending_until' => now()->addDays(2),
                'is_pending' => true,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'David',
                'last_name' => 'Sánchez',
                'user_name' => 'dsanchez',
                'email' => 'david.sanchez@example.com',
                'birth_day' => '1993-08-22',
                'image' => null,
                'type_user_id' => 2,
                'pending_token' => null,
                'pending_until' => null,
                'is_pending' => false,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Eva',
                'last_name' => 'Torres',
                'user_name' => 'etorres',
                'email' => 'eva.torres@example.com',
                'birth_day' => '1991-04-15',
                'image' => null,
                'type_user_id' => 1,
                'pending_token' => null,
                'pending_until' => null,
                'is_pending' => false,
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Pablo',
                'last_name' => 'Ruiz',
                'user_name' => 'pruiz',
                'email' => 'pablo.ruiz@example.com',
                'birth_day' => '1996-10-09',
                'image' => null,
                'type_user_id' => 2,
                'pending_token' => Str::uuid(),
                'pending_until' => now()->addDays(4),
                'is_pending' => true,
                'remember_token' => Str::random(10),
            ],
        ];

        foreach ($users as $userData) 
        {
            // Crear usuario principal
            $user = User::create([
                'name' => $userData['name'],
                'email' => $userData['email'],
            ]);

            // Crear password
            PasswordUsers::create([
                'user_id' => $user->id,
                'password' => Hash::make('12345678'), 
            ]);

            // Crear perfil
            userdata::create([
                'user_id' => $user->id,
                'last_name' => $userData['last_name'],
                'user_name' => $userData['user_name'],
                'birth_day' => $userData['birth_day'],
                'type_user_id' => $userData['type_user_id'],
                'pending_token' => $userData['pending_token'] ?? Str::uuid(),
                'pending_until' => $userData['pending_until'] ?? null,
                'is_pending' => $userData['is_pending'],
            ]);
        }
    }
}
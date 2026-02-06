<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('type_users')->insert([
            ['name' => 'Normal', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Admin',  'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

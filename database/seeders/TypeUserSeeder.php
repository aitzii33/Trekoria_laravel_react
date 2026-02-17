<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('type_user')->insert([
            ['id_typeUser' => 1, 'name' => 'User', 'created_at' => now(), 'updated_at' => now()],
            ['id_typeUser' => 2, 'name' => 'Admin',  'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

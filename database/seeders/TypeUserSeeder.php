<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeUserSeeder extends Seeder
{
    public function run(): void
    {
        DB::table('type_users')->insert([
            ['id' => 1, 'name' => 'User'],
            ['id' => 2, 'name' => 'Admin'],
        ]);
    }
}

<?php

namespace Database\Seeders;
use Illuminate\Support\Facades\DB;
//use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TypeUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('type_user')->insert([
            ['id_typeUser' => 1, 'name' => 'Normal', 'created_at' => now(), 'updated_at' => now()],
            ['id_typeUser' => 2, 'name' => 'Admin',  'created_at' => now(), 'updated_at' => now()],
        ]);
    }
}

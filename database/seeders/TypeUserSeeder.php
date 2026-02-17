<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TypeUserSeeder extends Seeder
{
    public function run(): void
    {
<<<<<<< HEAD
<<<<<<< HEAD
<<<<<<< HEAD
        DB::table('type_users')->insert([
            ['name' => 'Normal', 'created_at' => now(), 'updated_at' => now()],
            ['name' => 'Admin',  'created_at' => now(), 'updated_at' => now()],
=======
=======
>>>>>>> refs/remotes/origin/faeture-Aitziber
        DB::table('type_user')->insert([
            ['id_typeUser' => 1, 'name' => 'Normal', 'created_at' => now(), 'updated_at' => now()],
            ['id_typeUser' => 2, 'name' => 'Admin',  'created_at' => now(), 'updated_at' => now()],
>>>>>>> 343d23e (some changes)
=======

        DB::table('type_user')->insert([
            ['id_typeUser' => 1, 'name' => 'Normal', 'created_at' => now(), 'updated_at' => now()],
            ['id_typeUser' => 2, 'name' => 'Admin',  'created_at' => now(), 'updated_at' => now()],

>>>>>>> refs/remotes/origin/faeture-Aitziber
        ]);
    }
}

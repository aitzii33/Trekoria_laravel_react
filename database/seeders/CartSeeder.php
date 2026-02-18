<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Cart;
use App\Models\User;
use App\Models\Activity;

class CartSeeder extends Seeder
{
    public function run()
    {
        $users = User::all();
        $activities = Activity::all();

        foreach ($users as $user) {
            foreach ($activities->random(2) as $activity) 
            {
                Cart::create([
                    'user_id' => $user->id,
                    'activity_id' => $activity->id,
                    'quantity' => rand(1, 3),
                    'selected_hour' => '10:00'
                ]);
            }
        }
    }
}

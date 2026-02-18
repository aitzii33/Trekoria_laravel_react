<?php

namespace Database\Seeders;


use App\Models\Orders;
use Illuminate\Database\Seeder;

class OrderSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $faker = Faker::create();

        for ($i = 0; $i < 10; $i++) 
        {
            Orders::create([
                'full_name' => $faker->name,
                'dni' => $faker->numerify('########'), 
                'address' => $faker->streetAddress,
                'city' => $faker->city,
                'zip_code' => $faker->postcode,
                'card_number' => $faker->creditCardNumber,
                'card_name' => $faker->name,
                'expiry' => $faker->creditCardExpirationDateString,
                'cvv' => $faker->numerify('###'),
                'total' => $faker->randomFloat(2, 20, 500), 
                'status' => $faker->randomElement(['pending', 'completed', 'canceled']),
            ]);
        }

        $this->command->info('Orders seeded successfully!');
    }
}

<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
    /**
     * The users to seed.
     */
    protected static array $categories = [
        [
            'name' => 'Admin',
            'email' => 'admin@gmail.com',
            'password' => '123',
        ],
        [
            'name' => 'Cashier',
            'email' => 'cashier@gmail.com',
            'password' => '123',
        ],
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::$categories as $category) {
            User::create([
                'name' => $category['name'],
                'email' => $category['email'],
                'password' => bcrypt($category['password']),
            ]);
        }
    }
}

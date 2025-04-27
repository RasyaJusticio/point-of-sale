<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    /**
     * The categories to seed.
     */
    protected static array $categories = [
        'Makanan',
        'Minuman',
        'Snack',
        'Buah',
    ];

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        foreach (self::$categories as $category) {
            Category::create([
                'name' => $category,
            ]);
        }
    }
}

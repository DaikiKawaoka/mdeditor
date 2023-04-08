<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        User::create([
            'id' => 1,
            'last_name' => 'kawaoka',
            'first_name' => 'daiki',
            'email' => 'd.kawaoka0@gmail.com'
        ]);
    }
}

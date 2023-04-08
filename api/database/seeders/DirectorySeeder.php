<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Directory;

class DirectorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Directory::create([
            'id' => 1,
            'user_id' => 1,
            'name' => 'メモ',
            'deletable' => false,
            'created_at' => '2023-03-10 12:00:00'
        ]);
        Directory::create([
            'id' => 2,
            'user_id' => 1,
            'name' => '仕事',
            'created_at' => '2023-03-11 15:00:00'
        ]);
        Directory::create([
            'id' => 3,
            'user_id' => 1,
            'name' => 'プライベート',
            'created_at' => '2023-03-12 20:00:00'
        ]);
        Directory::create([
            'id' => 4,
            'user_id' => 1,
            'name' => 'プログラミング',
            'created_at' => now()
        ]);
        Directory::create([
            'id' => 5,
            'user_id' => 1,
            'name' => 'MarkDownテスト',
            'created_at' => now()
        ]);
    }
}

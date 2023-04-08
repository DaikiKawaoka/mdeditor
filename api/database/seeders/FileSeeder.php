<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\File;

class FileSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        File::create([
            'id' => 1,
            'user_id' => 1,
            'dir_id' => 1,
            'content' => '# タイトルタイトル1 ## タイトルタイトルタイトル',
            'created_at' => '2023-03-10 12:00:00',
            'updated_at' => '2023-03-10 12:00:00'
        ]);
        File::create([
            'id' => 2,
            'user_id' => 1,
            'dir_id' => 1,
            'content' => '# タイトルタイトル2 ## タイトルタイトルタイトル',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        File::create([
            'id' => 3,
            'user_id' => 1,
            'dir_id' => 1,
            'content' => '# タイトルタイトル3 ## タイトルタイトルタイトル',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        File::create([
            'id' => 4,
            'user_id' => 1,
            'dir_id' => 2,
            'content' => '# タイトルタイトル4 ## タイトルタイトルタイトル',
            'created_at' => now(),
            'updated_at' => now()
        ]);
        File::create([
            'id' => 5,
            'user_id' => 1,
            'dir_id' => 3,
            'content' => '# タイトルタイトル5 ## タイトルタイトルタイトル',
            'created_at' => now(),
            'updated_at' => now()
        ]);
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;

class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        // UserFactory を使用して5つのテストユーザーを生成し、データベースに挿入
        User::factory()->count(5)->create();
    }
}


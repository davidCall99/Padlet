<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new \App\Models\User;
        $user->name = 'Admin';
        $user->email = 'admin@gmail.com';
        $user->role = 'admin';
        $user->password = bcrypt('admintest1234');
        $user->save();

        $user2 = new \App\Models\User;
        $user2->name = 'CrazyJoe';
        $user2->email = 'crazy@gmail.com';
        $user2->role = 'user';
        $user2->password = bcrypt('crazyLady69');
        $user2->save();

    /*        $padlet1 = new \App\Models\Padlet;
        $padlet1->name = 'Crazy';

        $padlet2 = new \App\Models\Padlet;
        $padlet2->name = 'Supi';

        $padlet3 = new \App\Models\Padlet;
        $padlet3->name = 'Toll';

        $user->padlet()->saveMany([$padlet1,$padlet2,$padlet3]);
        $user->save();*/
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;


class PadletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $padlet = new \App\Models\Padlet;
        $padlet->name = 'Wild';
        $padlet->save();
        $users = \App\Models\User::all()->pluck("id");
        $padlet->users()->sync($users);
        $padlet->save();

        $padlet2 = new \App\Models\Padlet;
        $padlet2->name = 'Super';
        $padlet2->save();
        $users = \App\Models\User::all()->pluck("id");
        $padlet2->users()->sync($users);
        $padlet2->save();

        $padlet3 = new \App\Models\Padlet;
        $padlet3->name = 'Wahnsinn';
        $padlet3->save();
        $users = \App\Models\User::all()->pluck("id");
        $padlet3->users()->sync($users);
        $padlet3->save();

    }
}

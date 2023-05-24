<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rating = new \App\Models\Rating;
        $rating->rating = 2;

        $user = \App\Models\User::all()->first();
        $entry = \App\Models\Entry::all()->first();
        $rating->user()->associate($user);
        $rating->entry()->associate($entry);
        $rating->save();
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EntriesTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $entry = new \App\Models\Entry;
        $entry->content = 'ultra krass. Brunnen sind super!';

        $user = \App\Models\User::all()->first();
        $padlet = \App\Models\Padlet::all()->first();
        $entry->user()->associate($user);
        $entry->padlet()->associate($padlet);
        $entry->save();

        $entry2 = new \App\Models\Entry;
        $entry2->content = 'Pets are great!';

        $user = \App\Models\User::all()->first();
        $padlet = \App\Models\Padlet::all()->first();
        $entry2->user()->associate($user);
        $entry2->padlet()->associate($padlet);
        $entry2->save();
    }
}

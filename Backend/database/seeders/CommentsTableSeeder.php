<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comment = new \App\Models\Comment;
        $comment->content = 'Find ich auch!';

        $user = \App\Models\User::all()->first();
        $entry = \App\Models\Entry::all()->first();
        $comment->user()->associate($user);
        $comment->creator = $user->name;
        $comment->entry()->associate($entry);
        $comment->save();
    }
}

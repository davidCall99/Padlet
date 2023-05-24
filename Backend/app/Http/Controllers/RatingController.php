<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use App\Models\Rating;


class RatingController extends Controller
{
    public function index(Entry $entry): JsonResponse
    {
        return response()->json($entry->ratings, 200);
    }

    public function store(Request $request, Entry $entry)
    {
        $rating = new Rating($request->all());
        $rating->user_id = 1;
        $entry->ratings()->save($rating);

        return response()->json($rating, 201);
    }

}

<?php

namespace App\Http\Controllers;

use App\Models\Entry;
use App\Models\Padlet;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EntryController extends Controller
{
    public function index(Padlet $padlet): JsonResponse
    {
        return response()->json($padlet->entries,200);
    }

    public function store(Padlet $padlet, Request $request): JsonResponse
    {
        $entry = new Entry;
        $entry->content = $request->input('content');
        $entry->creator = $request->input('creator');
        $entry->user_id = $request->input('user_id');
        $entry->padlet_id = $padlet->id;
        $entry->save();

        return response()->json($entry, 201);
    }

    public function destroy(Padlet $padlet, Entry $entry)
    {
        $entry->delete();
        return response()->json(null, 204);
    }

    public function update(Request $request, Entry $entry)
    {
        $entry->update($request->all());

        return response()->json($entry, 200);
    }




}

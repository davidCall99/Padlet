<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Entry;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;

class CommentController extends Controller
{
    public function index(Entry $entry): JsonResponse
    {
        return response()->json($entry->comments,200);
    }

    public function store(Entry $entry, Request $request): JsonResponse
    {
        $comment = new Comment;
        $comment->content = $request->input('content');
        $comment->creator = $request->input('creator');
        $comment->user_id = $request->input('user_id');
        $comment->entry_id = $entry->id;
        $comment->save();

        return response()->json($comment, 201);
    }

    public function destroy(Comment $comment): JsonResponse
    {
        $comment->delete();
        return response()->json(null, 204);
    }

}

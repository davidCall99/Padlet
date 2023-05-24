<?php

namespace App\Http\Controllers;

use App\Models\Padlet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class PadletController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(): JsonResponse
    {
        $padlets = Padlet::all();
        return response()->json($padlets,200);
    }

    public function sharePadletWithEmail(Request $request, Padlet $padlet)
    {
        $email = $request->input('email');
        $user = User::where('email', $email)->first();

        if ($user) {
            // Fügen Sie den Benutzer zur padlet_user Tabelle hinzu
            $padlet->users()->attach($user->id, ['permission'=> 'read']);
        } else {
            return response()->json(['error' => 'User not found'], 404);
        }

        return response()->json($padlet, 200);
    }


    public function getPrivatePadlets(): JsonResponse
    {
        $user = auth()->user();
        $padlets = Padlet::whereHas('users', function($query) use ($user) {
            $query->where('user_id', $user->id)->where('permission', 'owner');
        })->where('private', true)->get();
        return response()->json($padlets, 200);
    }

    public function getPublicPadlets(): JsonResponse
    {
        $padlets = Padlet::where('private', false)->get();
        return response()->json($padlets, 200);
    }

    public function getSharedPadlets(User $user): JsonResponse
    {
        $padlets = Padlet::whereHas('users', function ($query) use ($user) {
            $query->where('user_id', $user->id)->where('permission', 'read');
        })->get();

        return response()->json($padlets,200);
    }



    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            // fügen Sie hier alle anderen Validierungen hinzu, die Sie benötigen
        ]);

        $padlet = new Padlet;
        $padlet->name = $request->name;
        $padlet->creator = $request->creator;
        $padlet->private = $request->private;
        $padlet->url = $request->url;

        $padlet->save();

        $padlet->users()->attach(auth()->user()->id, ['permission'=> 'owner']);

        return response()->json($padlet, 201);
        //tip
    }

    public function destroy(Padlet $padlet): JsonResponse
    {

        $padlet->delete();
        return response()->json(null, 204);
    }

    public function show(Padlet $padlet): JsonResponse
    {
        return response()->json($padlet,200);
    }




}

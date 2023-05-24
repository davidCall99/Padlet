<?php

use App\Http\Controllers\EntryController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PadletController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\AuthController;


/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::group(['middleware' => ['api','auth.jwt']], function() {
    Route::delete('padlets/{padlet}/entries/{entry}', [EntryController::class, 'destroy']);
    Route::delete('padlets/{padlet}', [PadletController::class, 'destroy']);
    Route::delete('comments/{comment}', [CommentController::class, 'destroy']);
    Route::put('entries/{entry}', [EntryController::class, 'update']);
    Route::post('auth/logout', [AuthController::class,'logout']);
    Route::get('user/{user}',[UserController::class, 'show']);
    Route::get('/padlets/private', [PadletController::class, 'getPrivatePadlets']);
    Route::get('shared-padlets/{user}', [PadletController::class, 'getSharedPadlets']);
    Route::post('/share-padlet/{padlet}/email', [PadletController::class, 'sharePadletWithEmail']);
    Route::post('padlets/{padlet}/entries', [EntryController::class, 'store']);
    Route::post('entries/{entry}/ratings', [RatingController::class, 'store']);
    Route::post('entries/{entry}/comments', [CommentController::class, 'store']);
    Route::post('padlets', [PadletController::class, 'store']);
});


Route::get('/padlets/public', [PadletController::class, 'getPublicPadlets']);
Route::get('padlets', [PadletController::class,'index']);
Route::get('padlets/{padlet}/entries', [EntryController::class,'index']);
Route::get('padlets/{padlet}', [PadletController::class, 'show']);
Route::get('entries/{entry}/comments', [CommentController::class,'index']);
Route::get('entries/{entry}/ratings', [RatingController::class,'index']);
Route::post('auth/login', [AuthController::class,'login']);



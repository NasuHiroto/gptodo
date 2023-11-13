<?php

use App\Http\Controllers\ToDoController;
use App\Http\Controllers\ToDoDetailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

/*
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
*/

//Route::get('todos', [ToDoController::class, 'index']);

Route::resource('todos', ToDoController::class);
//Route::get('todos', [ToDoController::class, 'index']);
//Route::post('todos', [ToDoController::class, 'index']);
Route::resource('tododetails', ToDoDetailController::class);

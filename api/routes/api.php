<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthenticateController;
use App\Http\Controllers\DirectoryController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\FileController;

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

Route::get('/auth/redirect', [AuthenticateController::class, 'redirectToGoogle']);
Route::get('/signin/callback', [AuthenticateController::class, 'handleGoogleCallback']);
Route::get('/signout', [AuthenticateController::class, 'signout']);

Route::group(['middleware' => ['auth:sanctum']], function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });

    Route::get('/home', [HomeController::class, 'index']);
    Route::get('/directories/{directoryId}/files', [FileController::class, 'index']);
    Route::post('/directory', [DirectoryController::class, 'store']);
    Route::put('/directory', [DirectoryController::class, 'update']);
    Route::delete('/directory', [DirectoryController::class, 'destroy']);
    Route::post('/file', [FileController::class, 'store']);
});
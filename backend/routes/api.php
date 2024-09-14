<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api;

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

Route::post('register', [Api\UserController::class, 'register']);
Route::post('login', [Api\UserController::class, 'login']);

Route::middleware('auth:api')->group(function () {
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::post('/user/update', [Api\UserController::class, 'updateUser']);
    Route::post('/user/reset-password', [Api\UserController::class, 'resetPassword']);
        
    Route::get('sources', [Api\SourceController::class, 'index']);
    Route::get('authors', [Api\AuthorController::class, 'index']);
    Route::get('categories', [Api\CategorieController::class, 'index']);

    Route::get('/user/sources', [Api\SourceController::class, 'getUserSoruces']);
    Route::get('/user/authors', [Api\AuthorController::class, 'getUserAuthers']);
    Route::get('/user/categories', [Api\CategorieController::class, 'getUserCategories']);

    //articles
    Route::get('articles', [Api\ArticleController::class, 'index']);
    Route::get('/article/{id}', [Api\ArticleController::class, 'show']);
    Route::post('articles/set-preferences', [Api\ArticleController::class, 'setPreferences']);
});

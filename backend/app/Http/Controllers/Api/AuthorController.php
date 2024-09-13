<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Author;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthorController extends Controller
{
    /**
     * Get all authors.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $authors = Author::all();
        return response()->json($authors);
    }

    /**
     * Get user selected categories.
     *
     * @return JsonResponse
     */
    public function getUserAuthers(): JsonResponse
    {
        $user = Auth::user();

        $authors = $user->authors()->select('id', 'name')->get();

        return response()->json($authors);
    }
}

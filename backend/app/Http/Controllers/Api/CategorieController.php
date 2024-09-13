<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class CategorieController extends Controller
{
    /**
     * Get all categories.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $categories = Category::all();
        return response()->json($categories);
    }

    /**
     * Get user selected categories.
     *
     * @return JsonResponse
     */
    public function getUserCategories(): JsonResponse
    {
        $user = Auth::user();

        $categories = $user->categories()->select('id', 'name')->get();

        return response()->json($categories);
    }
}

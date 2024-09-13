<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Source;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class SourceController extends Controller
{
    /**
     * Get all sources.
     *
     * @return JsonResponse
     */
    public function index(): JsonResponse
    {
        $sources = Source::all();

        return response()->json($sources);
    }

    /**
     * Get user selected soruces.
     *
     * @return JsonResponse
     */
    public function getUserSoruces(): JsonResponse
    {
        $user = Auth::user();

        $sources = $user->sources()->select('id', 'name')->get();

        return response()->json($sources);
    }

}

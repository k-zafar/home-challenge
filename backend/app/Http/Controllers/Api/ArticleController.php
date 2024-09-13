<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class ArticleController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        $user = Auth::user();

        $articles = Article::latest('publish_date');

        $articles = $this->userSources($user, $articles);
        $articles = $this->userCategories($user, $articles);
        $articles = $this->userAuthors($user, $articles);

        if ($request->search) {
            $articles = $this->search($articles, strip_tags(clean($request->search)));
        }

        if ($request->from && $request->to) {
            $articles = $this->filterByDate($articles, $this->parseDate($request->from), $this->parseDate($request->to));
        }

        if ($request->category) {
            $articles = $this->filterByCategoryOrSource($articles, 'category', $request->category);
        }

        if ($request->source) {
            $articles = $this->filterByCategoryOrSource($articles, 'source', $request->source);
        }

        $articles = $articles->paginate(10);

        return response()->json(['data' => $articles]);
    }

    private function search($articles, $search)
    {
        return $articles->where(function ($query) use ($search) {
            $query->where('name', 'like', '%' . $search . '%')
                ->orWhere('description', 'like', '%' . $search . '%')
                ->orWhere('content', 'like', '%' . $search . '%');
        });
    }

    private function parseDate($date): string
    {
        return Carbon::parse($date)->format('Y-m-d');
    }

    private function filterByDate($articles, $from, $to)
    {
        return $articles->whereBetween('publish_date', [$from, $to]);
    }

    private function filterByCategoryOrSource($articles, $relationship, $value)
    {
        return $articles->whereHas($relationship, function ($query) use ($value) {
            $query->where('id', $value);
        });
    }

    public function setPreferences(Request $request): JsonResponse
    {
        $user = Auth::user();

        $user->sources()->sync($request->sources ?: []);

        $user->categories()->sync($request->categories ?: []);

        $user->authors()->sync($request->authors ?: []);

        return response()->json(['message' => 'success']);
    }

    private function userSources($user, $articles)
    {
        $sources = $user->sources()->pluck('id')->toArray();
        return count($sources) > 0 ? $articles->whereIn('source_id', $sources) : $articles;
    }

    private function userCategories($user, $articles)
    {
        $categories = $user->categories()->pluck('id')->toArray();
        return count($categories) > 0 ? $articles->whereIn('category_id', $categories) : $articles;
    }

    private function userAuthors($user, $articles)
    {
        $authors = $user->authors()->pluck('id')->toArray();
        return count($authors) > 0 ? $articles->whereIn('author_id', $authors) : $articles;
    }
}

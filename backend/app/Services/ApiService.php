<?php

namespace App\Services;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\Source;
use Carbon\Carbon;

class ApiService
{
    public function getSource($name)
    {
        return Source::where('name', $name)->first();
    }

    public function getFrom($source): ?string
    {
        return $this->checkSource($source) && !empty($source->from) ? $source->from : null;
    }

    public function updateSource($source)
    {
        if ($this->checkSource($source)) {
            $source->update(['from' => $source->to, 'to' => now()]);
        }
    }

    public function checkSource($source): bool
    {
        return (bool)$source;
    }

    public function createAuthor($author)
    {
        return Author::firstOrCreate([
            'name' => $author
        ]);
    }

    public function createArticle($unique, $article)
    {
        Article::firstOrCreate($unique, $article);
    }

    public function createCategory($name)
    {
        return Category::firstOrCreate([
            'name' => $name
        ]);
    }
}


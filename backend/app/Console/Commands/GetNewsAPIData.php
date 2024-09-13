<?php

namespace App\Console\Commands;

use App\Models\Article;
use App\Models\Author;
use App\Models\Category;
use App\Models\NewsSource;
use App\Models\Source;
use Carbon\Carbon;
use Illuminate\Console\Command;
use jcobhams\NewsApi\NewsApi;
use jcobhams\NewsApi\NewsApiException;
use GuzzleHttp\Exception\ClientException;

class GetNewsAPIData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hc:get-news-api-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    /**
     * @var NewsApi
     */
    private $newsapi;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct()
    {
        parent::__construct();

        $this->newsapi = new NewsApi('d30b54c42d63409fb272aeb40d0f1950');
    }

    /**
     * Execute the console command.
     *
     * @return \Exception|int|NewsApiException
     * @throws \jcobhams\NewsApi\NewsApiException
     */
    public function handle()
    {
        $source = $this->getSource();

        $from = $this->getFrom($source);

        $source_id = $this->checkSource($source) ? $source->id : null;

        try {
            $totalResults = $this->data($from, 1, $source_id);
        } catch (NewsApiException | ClientException $e) {
            $totalResults = 0;
        }

        $totalPages = $totalResults > 0 ? (int)ceil($totalResults / 100) : 0;

        for ($i = 2; $i <= $totalPages; $i++) {
            try {
                $this->data($from, $i, $source_id);
            } catch (NewsApiException | ClientException $e) {
                break;
            }
        }

        $this->updateSource($source);
    }

    /**
     * @throws NewsApiException
     */
    private function data($from, $page, $source_id)
    {
        $data = $this->newsapi->getEverything('q', null, null, null, $from, null, 'en', null, null, $page);
        if ($data && $data->status == 'ok') {
            foreach ($data->articles as $article) {
                $this->createArticle($article, $source_id);
            }
        }
        return $data->totalResults;
    }

    private function getSource()
    {
        return Source::where('name', 'NewsAPI.org')->first();
    }

    private function getFrom($source): ?string
    {
        return $this->checkSource($source) && !empty($source->from) ? Carbon::parse($source->from)->format('c') : null;
    }

    private function updateSource($source)
    {
        if ($this->checkSource($source)) {
            $source->update(['from' => $source->to, 'to' => now()]);
        }
    }

    private function checkSource($source): bool
    {
        return (bool)$source;
    }

    private function getColumn($source): string
    {
        return !empty($source->id) ? 'source_id' : 'name';
    }

    private function getValue($source, $column)
    {
        return $column == 'source_id' ? $source->id : $source->name;
    }

    private function getCategory($column, $value)
    {
        $news_source = NewsSource::where($column, $value)->first(['category_id']);
        return $news_source ? $news_source->category_id : $this->getGeneralCategory();
    }

    private function createAuthor($author)
    {
        return Author::firstOrCreate([
            'name' => $author
        ]);
    }

    private function getGeneralCategory()
    {
        $category = Category::where('name', 'general')->first(['id']);
        return $category ? $category->id : null;
    }

    private function createArticle($article, $source_id)
    {
        $column = $this->getColumn($article->source);
        Article::firstOrCreate(
            [
                'name' => $article->title
            ],
            [
                'description' => !empty($article->description) ? $article->description : null,
                'content' => !empty($article->content) ? $article->content : null,
                'publish_date' => !empty($article->publishedAt) ? Carbon::parse($article->publishedAt)->format('Y-m-d H:i:s') : null,
                'image_url' => !empty($article->urlToImage) ? $article->urlToImage : null,
                'source_id' => $source_id,
                'category_id' => $this->getCategory($column, $this->getValue($article->source, $column)),
                'author_id' => !empty($article->author) ? $this->createAuthor($article->author)->id : null
            ]
        );
    }
}

<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Models\NewsSource;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Console\Command;
use jcobhams\NewsApi\NewsApi;
use jcobhams\NewsApi\NewsApiException;

class GetNewsSources extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hc:get-news-sources';

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
     * @return int
     */
    public function handle()
    {
        try {
            $data = $this->newsapi->getSources(null, 'en');
            if ($data && $data->status == 'ok') {
                foreach ($data->sources as $source) {
                    $this->createSource($source);
                }
            }
        } catch (NewsApiException | ClientException $e) {
            return 0;
        }
    }

    private function createSource($source)
    {
        NewsSource::firstOrCreate(
            [
                'source_id' => !empty($source->id) ? $source->id : null,
                'name' => !empty($source->name) ? $source->name : null
            ],
            [
                'category_id' => !empty($source->category) ? $this->getCategory($source->category) : null
            ]
        );
    }

    private function getCategory($name)
    {
        $category = Category::where('name', $name)->first();
        if ($category) {
            return $category->id;
        }
    }
}

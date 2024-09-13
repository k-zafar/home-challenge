<?php

namespace App\Console\Commands;

use App\Services\ApiService;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Http;
use GuzzleHttp\Exception\ClientException;

class GetNYTimesAPIData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hc:get-nytimes-api-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    /**
     * @var ApiService
     */
    private $apiService;

    /**
     * Create a new command instance.
     *
     * @return void
     */
    public function __construct(ApiService $apiService)
    {
        parent::__construct();

        $this->apiService = $apiService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     */
    public function handle()
    {
        $source = $this->apiService->getSource('New York Times');

        $from = $this->getFrom($source);

        $source_id = $this->apiService->checkSource($source) ? $source->id : null;

        try {
            $hits = $this->data($from, 1, $source_id);
        } catch (ClientException $e) {
            $hits = 0;
        }

        $pages = $hits > 0 ? (int)ceil($hits / 10) : 0;

        for ($i = 2; $i <= $pages; $i++) {
            try {
                $this->data($from, $i, $source_id);
            } catch (ClientException $e) {
                break;
            }
        }

        $this->apiService->updateSource($source);
    }

    private function data($from, $page, $source_id)
    {
        $response = Http::get('https://api.nytimes.com/svc/search/v2/articlesearch.json', [
            'api-key' => 'lwhGfcjGfnHw4ycAnnx58PIPLqLO651h',
            'begin_date' => $from,
            'page' => $page
        ]);

        $response = $response->json();

        if ($response && isset($response['response'])) {
            foreach ($response['response']['docs'] as $article) {
                $this->setData($article, $source_id);
            }
        }

        return isset($response['response']) ? $response['response']['meta']['hits'] : 0;
    }

    private function getFrom($source): ?string
    {
        $from = $this->apiService->getFrom($source);
        if (!empty($from)) {
            $from = Carbon::parse($from)->format('Ymd');
        }
        return $from;
    }

    private function setData($article, $source_id)
    {
        $unique['name'] = $article['headline']['main'];
        $data = [
            'description' => !empty($article['snippet']) ? $article['snippet'] : null,
            'content' => !empty($article['lead_paragraph']) ? $article['lead_paragraph'] : null,
            'publish_date' => !empty($article['pub_date']) ? Carbon::parse($article['pub_date'])->format('Y-m-d H:i:s') : null,
            'image_url' => !empty($article['multimedia'][0]['url']) ? "https://static01.nyt.com/" . $article['multimedia'][0]['url'] : null,
            'source_id' => $source_id,
            'category_id' => !empty($article['section_name']) ? $this->apiService->createCategory($article['section_name'])->id : null,
            'author_id' => !empty($article['byline']['original']) ? $this->apiService->createAuthor($this->removeBy($article['byline']['original']))->id : null
        ];
        $this->apiService->createArticle($unique, $data);
    }

    private function removeBy($author)
    {
        return str_replace("By ", "", $author);
    }
}

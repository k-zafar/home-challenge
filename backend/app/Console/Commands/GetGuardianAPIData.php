<?php

namespace App\Console\Commands;

use App\Models\Category;
use App\Services\ApiService;
use DateTime;
use DateTimeImmutable;
use Guardian\GuardianAPI;
use GuzzleHttp\Exception\ClientException;
use Illuminate\Console\Command;
use Illuminate\Support\Carbon;

class GetGuardianAPIData extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hc:get-guardian-api-data';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';
    /**
     * @var GuardianAPI
     */
    private $api;
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

        $this->api = new GuardianAPI('7a6f3272-1a3c-4ff6-910c-5cdca929d839');
        $this->apiService = $apiService;
    }

    /**
     * Execute the console command.
     *
     * @return int
     * @throws \Exception
     */
    public function handle()
    {
        $source = $this->apiService->getSource('The Guardian');

        $from = $this->getFrom($source);

        $source_id = $this->apiService->checkSource($source) ? $source->id : null;

        try {
            $pages = $this->data($from, 1, $source_id);
        } catch (ClientException $e) {
            $pages = 0;
        }

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
        $data = $this->api->content()
            ->setShowFields('bodyText,thumbnail,byline')
            ->setPage($page);

        if (!empty($from)) {
            $data = $data->setFromDate($from);
        }

        $data = $data->fetch();

        if ($data && $data->response->status == 'ok') {
            foreach ($data->response->results as $article) {
                $this->setData($article, $source_id);
            }
        }

        return $data->response->pages;
    }

    /**
     * @throws \Exception
     */
    private function convertToDateTimeImmutable($from): DateTimeImmutable
    {
        return DateTimeImmutable::createFromMutable(new DateTime($from));
    }

    private function setData($article, $source_id)
    {
        $unique['name'] = $article->webTitle;
        $data = [
            'content' => !empty($article->fields->bodyText) ? $article->fields->bodyText : null,
            'publish_date' => !empty($article->webPublicationDate) ? Carbon::parse($article->webPublicationDate)->format('Y-m-d H:i:s') : null,
            'image_url' => !empty($article->fields->thumbnail) ? $article->fields->thumbnail : null,
            'source_id' => $source_id,
            'category_id' => !empty($article->pillarName) ? $this->apiService->createCategory($article->pillarName)->id : null,
            'author_id' => !empty($article->fields->byline) ? $this->apiService->createAuthor($article->fields->byline)->id : null
        ];
        $this->apiService->createArticle($unique, $data);
    }

    /**
     * @throws \Exception
     */
    private function getFrom($source): ?DateTimeImmutable
    {
        $from = $this->apiService->getFrom($source);
        if (!empty($from)) {
            $from = $this->convertToDateTimeImmutable($from);
        }
        return $from;
    }
}

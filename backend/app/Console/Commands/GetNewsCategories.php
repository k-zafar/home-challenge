<?php

namespace App\Console\Commands;

use App\Models\Category;
use Illuminate\Console\Command;
use jcobhams\NewsApi\NewsApi;

class GetNewsCategories extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'hc:get-news-categories';

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
        $data = $this->newsapi->getCategories();
        if (!empty($data)) {
            foreach ($data as $datum) {
                $this->createCategory($datum);
            }
        }
    }

    private function createCategory($name)
    {
        Category::firstOrCreate([
            'name' => ucfirst($name)
        ]);
    }
}

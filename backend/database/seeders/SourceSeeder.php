<?php

namespace Database\Seeders;

use App\Models\Source;
use Illuminate\Database\Seeder;

class SourceSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $data = [
            [
                'id' => 1,
                'name' => 'The Guardian'
            ],
            [
                'id' => 2,
                'name' => 'New York Times'
            ],
            [
                'id' => 3,
                'name' => 'NewsAPI.org'
            ],
        ];

        foreach ($data as $datum) {
            Source::firstOrCreate(
                [
                    'id' => $datum['id'],
                    'name' => $datum['name']
                ]
            );
        }
    }
}

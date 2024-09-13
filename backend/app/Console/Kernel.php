<?php

namespace App\Console;

use Illuminate\Console\Scheduling\Schedule;
use Illuminate\Foundation\Console\Kernel as ConsoleKernel;

class Kernel extends ConsoleKernel
{
    /**
     * Define the application's command schedule.
     *
     * @param \Illuminate\Console\Scheduling\Schedule $schedule
     * @return void
     */
    protected function schedule(Schedule $schedule)
    {
        $schedule->command('hc:get-news-sources')->hourly()
            ->after(function () use ($schedule) {
                $schedule->command('hc:get-news-api-data')->runInBackground();
            });

        $schedule->command('hc:get-guardian-api-data')->hourly()->runInBackground();

        $schedule->command('hc:get-nytimes-api-data')->hourly()->runInBackground();
    }

    /**
     * Register the commands for the application.
     *
     * @return void
     */
    protected function commands()
    {
        $this->load(__DIR__ . '/Commands');

        require base_path('routes/console.php');
    }
}

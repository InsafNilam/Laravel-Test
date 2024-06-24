<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\FileManager;
use App\Services\FileService;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        // Register the FileService
        $this->app->singleton(FileService::class, function ($app) {
            return FileService::getInstance($app->make(FileManager::class));
        });
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }
}

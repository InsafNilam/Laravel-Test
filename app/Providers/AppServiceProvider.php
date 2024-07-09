<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use App\Services\FileManager;
use App\Services\FileService;
use App\Services\PdfManager;
use App\Services\PdfService;



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

        $this->app->singleton(PdfService::class, function ($app) {
            return PdfService::getInstance($app->make(PdfManager::class));
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

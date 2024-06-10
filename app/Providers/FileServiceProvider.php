<?php

namespace App\Providers;

use App\Services\FileService;
use App\Services\FileManager;
use Illuminate\Support\ServiceProvider;

class FileServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * This method is responsible for registering the services provided by the FileServiceProvider.
     * It is called when the application is bootstrapped and allows the provider to bind any necessary
     * services into the application's service container.
     *
     * @return void
     */
    public function register(): void
    {
        //
        $this->app->singleton(FileService::class, function ($app) {
            return FileService::getInstance($app->make(FileManager::class));
        });
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        //
    }
}

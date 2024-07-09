<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Batch>
 */
class BatchFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->name,
            'purchase_order_no' => $this->faker->randomNumber(),
            'status' => $this->faker->randomElement(['active', 'inactive']),
            'description' => $this->faker->sentence,
            'created_at' => $this->faker->dateTime,
            'updated_at' => $this->faker->dateTime,
            'deleted_at' => null,
        ];

    }
}

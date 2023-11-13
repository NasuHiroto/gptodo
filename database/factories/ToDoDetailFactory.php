<?php

namespace Database\Factories;

use App\Models\ToDoDetail;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\ToDoDetail>
 */
class ToDoDetailFactory extends Factory
{
    protected $model = ToDoDetail::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'completed_flag' => $this->faker->boolean()
        ];
    }
}

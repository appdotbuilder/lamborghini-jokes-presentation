<?php

namespace Database\Seeders;

use App\Models\Presentation;
use App\Models\User;
use Illuminate\Database\Seeder;

class PresentationSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create some demo users and presentations if no presentations exist
        if (Presentation::count() === 0) {
            $users = User::factory()->count(5)->create();
            
            foreach ($users as $user) {
                // Each user has completed the presentation 1-3 times
                Presentation::factory()
                    ->count(fake()->numberBetween(1, 3))
                    ->create(['user_id' => $user->id]);
            }
        }
    }
}
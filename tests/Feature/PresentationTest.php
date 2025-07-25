<?php

namespace Tests\Feature;

use App\Models\Presentation;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PresentationTest extends TestCase
{
    use RefreshDatabase;

    public function test_authenticated_user_can_view_presentation(): void
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Presentation')
                ->has('completionCount')
        );
    }

    public function test_unauthenticated_user_is_redirected_to_login(): void
    {
        $response = $this->get('/');

        $response->assertRedirect('/login');
    }

    public function test_user_can_complete_presentation(): void
    {
        $user = User::factory()->create();
        
        $response = $this->actingAs($user)->post('/presentation');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) => 
            $page->component('Presentation')
                ->has('completionCount')
                ->has('justCompleted')
                ->where('justCompleted', true)
        );

        $this->assertDatabaseHas('presentations', [
            'user_id' => $user->id,
        ]);
    }

    public function test_completion_count_increases_with_each_completion(): void
    {
        $users = User::factory()->count(3)->create();
        
        // First user completes presentation
        $this->actingAs($users[0])->post('/presentation');
        
        // Second user views presentation
        $response = $this->actingAs($users[1])->get('/');
        $response->assertInertia(fn ($page) => 
            $page->where('completionCount', 1)
        );
        
        // Second user completes presentation
        $this->actingAs($users[1])->post('/presentation');
        
        // Third user views presentation
        $response = $this->actingAs($users[2])->get('/');
        $response->assertInertia(fn ($page) => 
            $page->where('completionCount', 2)
        );
    }

    public function test_user_can_complete_presentation_multiple_times(): void
    {
        $user = User::factory()->create();
        
        // Complete presentation twice
        $this->actingAs($user)->post('/presentation');
        $this->actingAs($user)->post('/presentation');

        $this->assertDatabaseCount('presentations', 2);
        $this->assertDatabaseHas('presentations', [
            'user_id' => $user->id,
        ]);
    }

    public function test_presentation_model_has_correct_relationships(): void
    {
        $user = User::factory()->create();
        $presentation = Presentation::factory()->create(['user_id' => $user->id]);

        $this->assertTrue($presentation->user->is($user));
    }
}
<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Http\Requests\StorePresentationRequest;
use App\Models\Presentation;
use Inertia\Inertia;

class PresentationController extends Controller
{
    /**
     * Display the presentation.
     */
    public function index()
    {
        $completionCount = Presentation::count();
        
        return Inertia::render('Presentation', [
            'completionCount' => $completionCount
        ]);
    }
    
    /**
     * Record a presentation completion.
     */
    public function store(StorePresentationRequest $request)
    {
        Presentation::create([
            'user_id' => auth()->id(),
            'completed_at' => now(),
        ]);
        
        $completionCount = Presentation::count();
        
        return Inertia::render('Presentation', [
            'completionCount' => $completionCount,
            'justCompleted' => true
        ]);
    }
}
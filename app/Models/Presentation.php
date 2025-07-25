<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

/**
 * App\Models\Presentation
 *
 * @property int $id
 * @property int $user_id
 * @property \Illuminate\Support\Carbon $completed_at
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\User $user
 * 
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation query()
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation whereCompletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Presentation whereUserId($value)
 * @method static \Database\Factories\PresentationFactory factory($count = null, $state = [])
 * 
 * @mixin \Eloquent
 */
class Presentation extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'user_id',
        'completed_at',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'completed_at' => 'datetime',
        'created_at' => 'datetime',
        'updated_at' => 'datetime',
    ];

    /**
     * Get the user that completed the presentation.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
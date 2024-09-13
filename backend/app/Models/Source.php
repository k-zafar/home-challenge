<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use \Illuminate\Database\Eloquent\Relations\HasOne;
use \Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Source extends Model
{
    use HasFactory;

    protected $fillable = [
        'id',
        'name',
        'from',
        'to'
    ];

    public function article(): HasOne
    {
        return $this->hasOne(Article::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'source_user');
    }
}

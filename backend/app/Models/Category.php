<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory;

    protected $fillable = [
        'name'
    ];

    public function article(): HasOne
    {
        return $this->hasOne(Article::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_user');
    }

    public function newsSource(): HasOne
    {
        return $this->hasOne(NewsSource::class);
    }
}

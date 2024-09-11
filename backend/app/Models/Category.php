<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Category extends Model
{
    use HasFactory;

    public function article(): HasOne
    {
        return $this->hasOne(Article::class);
    }

    public function users(): BelongsToMany
    {
        return $this->belongsToMany(User::class, 'category_user');
    }
}

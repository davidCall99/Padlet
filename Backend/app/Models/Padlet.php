<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Padlet extends Model
{
    protected $fillable = ['name', 'creator','private', 'url'];

    public function users() : BelongsToMany{
        return $this->belongsToMany(User::class, 'padlet_users')->withPivot('permission');
    }

    public function entries() : HasMany
    {
        return $this->hasMany(Entry::class);
    }
}

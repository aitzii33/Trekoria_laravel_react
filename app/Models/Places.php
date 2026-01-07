<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;

    protected $fillable = ['city', 'country', 'continent', 'image'];

    public function activities()
    {
        return $this->hasMany(Activity::class);
    }
}

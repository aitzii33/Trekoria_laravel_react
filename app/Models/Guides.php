<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Guides extends Model
{
    protected $fillable = ['id_activity', 'guide', 'name', 'price'];

    // Relación: Un guía pertenece a una actividad
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Guides extends Model
{
    use HasFactory;
    
    protected $fillable = ['id_activity', 'guide', 'name', 'price'];

    // Relación: Un guía pertenece a una actividad
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}

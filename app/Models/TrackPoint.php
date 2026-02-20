<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TrackPoint extends Model
{
    use HasFactory;

    protected $fillable = [
        'activity_id',
        'latitude',
        'longitude',
    ];

    // Definir la relación con la actividad
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }
}
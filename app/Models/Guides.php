<?php

namespace App\Models;

use App\Models\Activity;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guides extends Model
{
    use HasFactory;
    
    protected $fillable = ['id_activity', 'guide', 'name', 'price'];

    // Relación: Un guía pertenece a una actividad
    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function bookings() 
    {
        return $this->hasMany(Booking::class);
    }
}

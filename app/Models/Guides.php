<?php

namespace App\Models;

use App\Models\Activity;
use App\Models\Booking;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Guides extends Model
{
    use HasFactory;
    
    protected $fillable = ['id_activity', 'guide', 'name', 'price','date'];

    // Relación: Un guía pertenece a una actividad
    public function activity()
    {
        return $this->belongsTo(Activity::class, 'id_activity');
    }

    public function bookings() 
    {
        return $this->hasMany(Booking::class);
    }
}

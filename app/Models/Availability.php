<?php

namespace App\Models;

use App\Models\Booking;
use Illuminate\Database\Eloquent\Model;

class Availabity extends Model
{
    protected $fillable = [
        'time_schedule_id',
        'date',
        'capacity',
        'reserved',
    ];

    public function bookings() 
    {
        return $this->hasMany(Booking::class);
    }
}

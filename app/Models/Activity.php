<?php

namespace App\Models;

use App\Models\Guides;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Activity extends Model
{
    use HasFactory;

    // Fillable fields for mass assignment
    protected $fillable = [
        'place_id',
        'name',
        'description',
        'location',
        'image',
        'price',
        'is_active',
    ];

    // Relationships
    public function place()
    {
        return $this->belongsTo(Places::class);
    }

    public function timeSchedules()
    {
        return $this->hasMany(TimeSchedule::class);
    }

    public function guides()
    {
        return $this->hasMany(Guides::class);
    }

    public function bookings() 
    {
        return $this->hasManyThrough(Booking::class, Availability::class, 'time_schedule_id', 'availability_id');
    }
}

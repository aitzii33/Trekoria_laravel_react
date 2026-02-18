<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

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
        'date',
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
        return $this->hasMany(Guide::class, 'id_activity');
    }
}

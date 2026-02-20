<?php

namespace App\Models;

use App\Models\Guides;
use App\Models\Places;
use App\Models\TimeSchedule;
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
        'date',
        'is_active',
    ];

    // Relationships
    public function place()
    {
        return $this->belongsTo(Places::class);
    }

    public function schedules()
    {
        return $this->hasMany(TimeSchedule::class);
    }

    public function guides()
    {
        return $this->hasMany(Guides::class, 'id_activity');
    }

    public function trackPoints()
    {
        return $this->hasMany(TrackPoint::class);
    }
}

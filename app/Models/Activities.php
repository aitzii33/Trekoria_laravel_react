<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Categories extends Model
{
    protected $fillable = ['name', 'description'];

    public function place()
    {
        return $this->belongsTo(Place::class);
    }

    public function timeSchedules()
    {
        return $this->hasMany(TimeSchedule::class);
    }

    public function guides()
    {
        return $this->hasMany(Guide::class);
    }
}

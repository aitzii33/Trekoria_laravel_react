<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TimeSchedule extends Model
{
    protected $fillable = ['id_activity', 'day_week', 'hour'];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function disponibilities()
    {
        return $this->hasMany(Disponibility::class);
    }
}

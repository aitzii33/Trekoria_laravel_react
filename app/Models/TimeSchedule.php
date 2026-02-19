<?php

namespace App\Models;

use App\Models\Activity;
use App\Models\Disponibility;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TimeSchedule extends Model
{
    use HasFactory;
    
    protected $fillable = ['activity_id', 'day_week', 'hour'];

    public function activity()
    {
        return $this->belongsTo(Activity::class);
    }

    public function disponibilities()
    {
        return $this->hasMany(Disponibility::class);
    }
}

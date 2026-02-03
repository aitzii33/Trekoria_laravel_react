<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TimeSchedule extends Model
{
    use HasFactory;
    
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

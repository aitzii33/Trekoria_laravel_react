<?php

namespace App\Models;

use App\Models\Activity;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    protected $fillable = [
        'availability_id',
        'user_id',
        'guide_id',
        'people',
        'total_price',
        'status',
    ];

    public function activity() 
    {
        return $this->belongsTo(Activity::class, 'activity_id');
    }
}

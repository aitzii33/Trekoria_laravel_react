<?php

namespace App\Models;

use App\Models\User;
use Illuminate\Database\Eloquent\Model;

class Cart extends Model
{
    protected $fillable = ['user_id', 'activity_id', 'quantity', 'selected_hour'];
    
    public function user() { return $this->belongsTo(User::class); }
    public function activity() { return $this->belongsTo(Activity::class); }
}


<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;

class userdata extends Model
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable, SoftDeletes;

    protected $table = 'user';
    
    protected $fillable = ['user_id', 'last_name', 'user_name', 'birth_day', 'image', 'type_user_id', 
                           'pending_token', 'pending_until', 'is_pending'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Fortify\TwoFactorAuthenticatable;
use Illuminate\Database\Eloquent\SoftDeletes; 

class User extends Authenticatable
{
    use HasFactory, Notifiable, TwoFactorAuthenticatable, SoftDeletes;

    public $incrementing = true;  

    protected $fillable = ['name', 'user_name', 'last_name', 'email', 'birth_day', 'type_user'];

    public function typeUser()
    {
        return $this->belongsTo(TypeUser::class, 'type_user', 'id_typeUser');
    }

    public function isAdmin()
    {
        return $this->role === 'admin';
    }
    
    public function isUser()
    {
        return $this->role === 'user';
    }


    protected $hidden = [
        'password',
        'two_factor_secret',
        'two_factor_recovery_codes',
        'remember_token',
    ];


    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
            'two_factor_confirmed_at' => 'datetime',
        ];
    }
}

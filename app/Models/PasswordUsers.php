<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class PasswordUsers extends Model
{
    protected $fillable = ['id_user', 'user', 'password'];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }
}

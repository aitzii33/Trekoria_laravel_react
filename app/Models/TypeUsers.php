<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TypeUsers extends Model
{
    protected $fillable = ['name'];

    public function users()
    {
        return $this->hasMany(User::class, 'type_user', 'id_typeUser');
    }
}

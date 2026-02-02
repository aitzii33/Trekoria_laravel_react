<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class TypeUsers extends Model
{
    use HasFactory;
    protected $fillable = ['type_user'];

    public function users()
    {
        return $this->hasMany(User::class, 'type_user', 'id_typeUser');
    }
}

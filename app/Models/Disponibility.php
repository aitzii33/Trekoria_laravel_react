<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Disponibility extends Model
{
    use HasFactory;
    
    protected $fillable = ['id_activity', 'total_people', 'reserve_people'];

    // Relación: Una disponibilidad pertenece a un horario
    public function timeSchedule()
    {
        return $this->belongsTo(TimeSchedule::class);
    }
}

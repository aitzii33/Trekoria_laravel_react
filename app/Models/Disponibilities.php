<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Disponibility extends Model
{
    protected $fillable = ['id_activity', 'total_people', 'reserve_people'];

    // Relación: Una disponibilidad pertenece a un horario
    public function timeSchedule()
    {
        return $this->belongsTo(TimeSchedule::class);
    }
}

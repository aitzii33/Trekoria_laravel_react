<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Orders extends Model
{
    protected $fillable = ['cliente_id', 'total', 'state', 'delivery_date'];
    
    public function client() 
    {
        return $this->belongsTo(Cliente::class);
    }
    
    public function details() 
    {
        return $this->hasMany(PedidoDetalle::class);
    }

}

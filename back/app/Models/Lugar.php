<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Lugar extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'barrio_id',
        'calle',
        'numero',
        'manzana',
        'lote',
        'piso',
        'dpto',
    ];

    // Relación con Barrio
    public function barrio()
    {
        return $this->belongsTo(Barrio::class);
    }

}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Barrio extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'localidad_id',
        'nombre'
    ];

    // Relación con Localidad
    public function localidad()
    {
        return $this->belongsTo(Localidad::class);
    }
    
    public function lugares()
    {
        return $this->hasMany(Lugar::class);
    }
}

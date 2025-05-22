<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Localidad extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'departamento_id',
        'nombre'
    ];

    // Relación con Departamento
    public function departamento()
    {
        return $this->belongsTo(Departamento::class);
    }
    
    public function barrios()
    {
        return $this->hasMany(Barrio::class);
    }

}

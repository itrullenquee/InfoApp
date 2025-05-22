<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Departamento extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
        'provincia_id',
        'nombre'
    ];

    public function provincia()
    {
        return $this->belongsTo(Provincia::class);
    }
    
    public function localidades()
    {
        return $this->hasMany(Localidad::class);
    }
}

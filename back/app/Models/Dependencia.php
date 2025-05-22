<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dependencia extends Model
{
    use HasFactory, SoftDeletes;

    protected $fillable = [
       'departamental_id',
       'nombre'
    ];

    protected $casts = [
        'fecha_inicio' => 'date',
        'fecha_fin' => 'date'
    ];

    // Relación con Proyecto
    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class);
    }

    // Relación muchos a muchos con Funcionarios
    public function funcionarios()
    {
        return $this->belongsToMany(Funcionario::class, 'funcionarios_x_tareas')
            ->withPivot('estado')
            ->withTimestamps();
    }

    public function departamental()
    {
        return $this->belongsTo(Departamental::class);
    }
}

<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Funcionario extends Model
{
    use HasFactory;

    protected $fillable = ['persona_id', 'jerarquia_id', 'oficina_id', 'legajo_personal', 'estado'];

    public function persona()
    {
        return $this->belongsTo(Persona::class);
    }

    public function jerarquia()
    {
        return $this->belongsTo(Jerarquia::class);
    }

    public function oficina()
    {
        return $this->belongsTo(Oficina::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function proyectos()
    {
        return $this->belongsToMany(Proyecto::class, 'funcionario_proyecto', 'funcionario_id', 'proyecto_id');
    }
    public function tareas()
    {
        return $this->belongsToMany(Tarea::class, 'funcionarios_x_tarea', 'funcionario_id', 'tarea_id');
    }
}

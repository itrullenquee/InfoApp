<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FuncionariosXTarea extends Model
{
    protected $fillable = ['funcionario_id', 'tarea_id'];

    public function funcionario()
    {
        return $this->belongsTo(Funcionario::class);
    }
    public function tarea()
    {
        return $this->belongsTo(Tarea::class);
    }
}

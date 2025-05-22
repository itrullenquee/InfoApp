<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Oficina extends Model
{
    protected $fillable = ['nombre', 'descripcion'];

    public function funcionarios()
{
    return $this->hasMany(Funcionario::class);
}

}

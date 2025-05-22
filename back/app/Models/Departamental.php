<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Departamental extends Model
{
    protected $fillable = ['nombre'];

    public function dependencias()
    {
        return $this->hasMany(Dependencia::class);
    }
}

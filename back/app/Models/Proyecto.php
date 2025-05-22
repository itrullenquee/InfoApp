<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;


class Proyecto extends Model
{
    use HasFactory, SoftDeletes;
    use LogsActivity;
    protected static $logName = 'proyectos';
    protected static $logAttributes = ['titulo', 'fecha_inicio', 'fecha_fin', 'estado','tipo_id'];
    protected $fillable = ['titulo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'estado','tipo_id'];

    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        return \Spatie\Activitylog\LogOptions::defaults()
            ->logOnly(self::$logAttributes)
            ->useLogName(self::$logName)
            ->logOnlyDirty();
    }
    
    public function tareas()
    {
        return $this->hasMany(Tarea::class);
    }

    public function funcionarios()
    {
        return $this->belongsToMany(Funcionario::class);
    }
}

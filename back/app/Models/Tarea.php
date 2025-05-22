<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;

class Tarea extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;
    protected static $logAttributes = ['titulo', 'fecha_fin', 'estado'];
    protected static $logName = 'novedades';

    public function getActivitylogOptions(): \Spatie\Activitylog\LogOptions
    {
        return \Spatie\Activitylog\LogOptions::defaults()
            ->logOnly(self::$logAttributes)
            ->useLogName(self::$logName);
    }

    public function getDescriptionForEvent(string $eventName): string
    {
        return "se {$eventName} una novedad";
    }

    protected $fillable = ['proyecto_id', 'titulo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'estado'];

    public function proyecto()
    {
        return $this->belongsTo(Proyecto::class);
    }

    public function funcionarios()
    {
        return $this->belongsToMany(Funcionario::class, 'funcionarios_x_tareas')->withTimestamps();
    }
}

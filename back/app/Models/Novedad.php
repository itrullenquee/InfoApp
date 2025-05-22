<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;


use Spatie\Activitylog\LogOptions;

class Novedad extends Model
{
    use HasFactory, SoftDeletes;
    use LogsActivity;

    protected static $logName = 'novedades';
    protected static $logAttributes = ['titulo', 'fecha_inicio', 'categoria_id', 'funcionario_id'];
    protected static $logOnlyDirty = true;
    protected static $submitEmptyLogs = false;

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['titulo', 'fecha_inicio', 'categoria_id', 'funcionario_id'])
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs()
            ->useLogName('novedades');
    }

    public function getDescriptionForEvent(string $eventName): string
    {
        return "Se ha {$eventName} una novedad";
    }

    protected $fillable = ['funcionario_id', 'categoria_id', 'dependencia_id', 'lugar_id', 'titulo', 'descripcion', 'fecha_inicio', 'fecha_fin', 'imagen', 'pdf', 'estado'];

    public function funcionario()
    {
        return $this->belongsTo(Funcionario::class);
    }

    public function categoria()
    {
        return $this->belongsTo(Categoria::class);
    }

    public function dependencia()
    {
        return $this->belongsTo(Dependencia::class);
    }

    public function lugar()
    {
        return $this->belongsTo(Lugar::class);
    }
}

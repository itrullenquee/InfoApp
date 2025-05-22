<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Novedad;
use App\Models\Funcionario;

class NovedadSeeder extends Seeder
{
    public function run(): void
    {
        $funcionarios = Funcionario::all();
        
        $novedades = [
            [
                'funcionario_id' => $funcionarios[0]->id,
                'categoria_id' => 1,
                'dependencia_id' => 1,
                'lugar_id' => 1,
                'titulo' => 'Reunión de Coordinación',
                'descripcion' => 'Reunión para coordinar actividades del mes',
                'fecha_inicio' => now(),
                'fecha_fin' => now()->addDays(1),
                'estado' => 'pendiente'
            ],
            [
                'funcionario_id' => $funcionarios[1]->id,
                'categoria_id' => 2,
                'dependencia_id' => 2,
                'lugar_id' => 2,
                'titulo' => 'Capacitación',
                'descripcion' => 'Capacitación sobre nuevos procedimientos',
                'fecha_inicio' => now()->addDays(2),
                'fecha_fin' => now()->addDays(3),
                'estado' => 'programada'
            ],
            [
                'funcionario_id' => $funcionarios[1]->id,
                'categoria_id' => 2,
                'dependencia_id' => 2,
                'lugar_id' => 2,
                'titulo' => 'Capacitación',
                'descripcion' => 'Capacitación sobre nuevos procedimientos',
                'fecha_inicio' => now()->addDays(2),
                'fecha_fin' => now()->addDays(3),
                'estado' => 'programada'
            ],
            [
                'funcionario_id' => $funcionarios[1]->id,
                'categoria_id' => 2,
                'dependencia_id' => 2,
                'lugar_id' => 2,
                'titulo' => 'Capacitación',
                'descripcion' => 'Capacitación sobre nuevos procedimientos',
                'fecha_inicio' => now()->addDays(2),
                'fecha_fin' => now()->addDays(3),
                'estado' => 'programada'
            ],
            [
                'funcionario_id' => $funcionarios[1]->id,
                'categoria_id' => 2,
                'dependencia_id' => 2,
                'lugar_id' => 2,
                'titulo' => 'Capacitación',
                'descripcion' => 'Capacitación sobre nuevos procedimientos',
                'fecha_inicio' => now()->addDays(2),
                'fecha_fin' => now()->addDays(3),
                'estado' => 'programada'
            ],
            [
                'funcionario_id' => $funcionarios[1]->id,
                'categoria_id' => 2,
                'dependencia_id' => 2,
                'lugar_id' => 2,
                'titulo' => 'Capacitación',
                'descripcion' => 'Capacitación sobre nuevos procedimientos',
                'fecha_inicio' => now()->addDays(2),
                'fecha_fin' => now()->addDays(3),
                'estado' => 'programada'
            ],
            [
                'funcionario_id' => $funcionarios[1]->id,
                'categoria_id' => 2,
                'dependencia_id' => 2,
                'lugar_id' => 2,
                'titulo' => 'Capacitación',
                'descripcion' => 'Capacitación sobre nuevos procedimientos',
                'fecha_inicio' => now()->addDays(2),
                'fecha_fin' => now()->addDays(3),
                'estado' => 'programada'
            ],
            [
                'funcionario_id' => $funcionarios[2]->id,
                'categoria_id' => 3,
                'dependencia_id' => 3,
                'lugar_id' => 3,
                'titulo' => 'Mantenimiento',
                'descripcion' => 'Mantenimiento preventivo de equipos',
                'fecha_inicio' => now()->addDays(4),
                'fecha_fin' => now()->addDays(5),
                'estado' => 'programada'
            ]
        ];

        foreach ($novedades as $novedad) {
            Novedad::create($novedad);
        }
    }
} 
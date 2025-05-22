<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Proyecto;

class ProyectoSeeder extends Seeder
{
    public function run(): void
    {
        $proyectos = [
            [
                'titulo' => 'Mejora de Infraestructura',
                'descripcion' => 'Proyecto de mejora y mantenimiento de la infraestructura municipal',
                'fecha_inicio' => now(),
                'fecha_fin' => now()->addMonths(6),
                'estado' => 'en_progreso'
            ],
            [
                'titulo' => 'Programa de Educación',
                'descripcion' => 'Implementación de programas educativos en la comunidad',
                'fecha_inicio' => now()->addDays(15),
                'fecha_fin' => now()->addMonths(3),
                'estado' => 'planificado'
            ],
            [
                'titulo' => 'Campaña de Salud',
                'descripcion' => 'Campaña de vacunación y concientización sobre salud pública',
                'fecha_inicio' => now()->addDays(30),
                'fecha_fin' => now()->addMonths(2),
                'estado' => 'planificado'
            ]
        ];

        foreach ($proyectos as $proyecto) {
            Proyecto::create($proyecto);
        }
    }
} 
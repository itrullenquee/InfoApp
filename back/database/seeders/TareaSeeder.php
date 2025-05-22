<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Tarea;
use App\Models\Proyecto;

class TareaSeeder extends Seeder
{
    public function run(): void
    {
        $proyectos = Proyecto::all();

        $tareas = [
            [
                'proyecto_id' => $proyectos[0]->id,
                'titulo' => 'Evaluación inicial',
                'descripcion' => 'Realizar evaluación del estado actual de la infraestructura',

                'fecha_fin' => now()->addDays(7),
                'estado' => 'en_progreso'
            ],
            [
                'proyecto_id' => $proyectos[0]->id,
                'titulo' => 'Planificación de obras',
                'descripcion' => 'Desarrollar plan detallado de obras y mejoras',

                'fecha_fin' => now()->addDays(15),
                'estado' => 'pendiente'
            ],
            [
                'proyecto_id' => $proyectos[1]->id,
                'titulo' => 'Diseño del programa',
                'descripcion' => 'Diseñar estructura y contenido del programa educativo',

                'fecha_fin' => now()->addDays(30),
                'estado' => 'pendiente'
            ],
            [
                'proyecto_id' => $proyectos[2]->id,
                'titulo' => 'Organización de campaña',
                'descripcion' => 'Coordinar recursos y personal para la campaña de salud',

                'fecha_fin' => now()->addDays(45),
                'estado' => 'pendiente'
            ]
        ];

        foreach ($tareas as $tarea) {
            Tarea::create($tarea);
        }
    }
}

<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\FuncionarioTarea;

class FuncionarioTareaSeeder extends Seeder
{
    public function run(): void
    {
        $funcionarioTareas = [
            [
                'funcionario_id' => 1,
                'tarea_id' => 1,
                'estado' => 'asignado'
            ],
            [
                'funcionario_id' => 2,
                'tarea_id' => 2,
                'estado' => 'asignado'
            ],
            [
                'funcionario_id' => 3,
                'tarea_id' => 3,
                'estado' => 'asignado'
            ],
            [
                'funcionario_id' => 1,
                'tarea_id' => 4,
                'estado' => 'asignado'
            ]
        ];

        foreach ($funcionarioTareas as $funcionarioTarea) {
            FuncionarioTarea::create($funcionarioTarea);
        }
    }
} 
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Dependencia;

class DependenciaSeeder extends Seeder
{
    public function run(): void
    {
        $dependencias = [
            ['departamental_id' => 1, 'nombre' => 'Dependencia Norte 1'],
            ['departamental_id' => 1, 'nombre' => 'Dependencia Norte 2'],
            ['departamental_id' => 2, 'nombre' => 'Dependencia Sur 1'],
            ['departamental_id' => 2, 'nombre' => 'Dependencia Sur 2'],
            ['departamental_id' => 3, 'nombre' => 'Dependencia Este 1'],
            ['departamental_id' => 3, 'nombre' => 'Dependencia Este 2'],
            ['departamental_id' => 4, 'nombre' => 'Dependencia Oeste 1'],
            ['departamental_id' => 4, 'nombre' => 'Dependencia Oeste 2'],
            ['departamental_id' => 5, 'nombre' => 'Dependencia Centro 1'],
            ['departamental_id' => 5, 'nombre' => 'Dependencia Centro 2'],
        ];

        foreach ($dependencias as $dependencia) {
            Dependencia::create($dependencia);
        }
    }
} 
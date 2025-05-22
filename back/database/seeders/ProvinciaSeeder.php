<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Provincia;

class ProvinciaSeeder extends Seeder
{
    public function run()
    {
        $provincias = [
            ['nombre' => 'Santiago del Estero'],
            ['nombre' => 'Buenos Aires'],
            ['nombre' => 'Catamarca'],
            ['nombre' => 'Chaco'],
            ['nombre' => 'Chubut'],
            ['nombre' => 'Cordoba'],
            ['nombre' => 'Corrientes'],
            ['nombre' => 'Entre Ríos'],
            ['nombre' => 'Formosa'],
            ['nombre' => 'Jujuy'],
            ['nombre' => 'La Pampa'],
            ['nombre' => 'La Rioja'],
            ['nombre' => 'Mendoza'],
            ['nombre' => 'Misiones'],
            ['nombre' => 'Neuquén'],
            ['nombre' => 'Río Negro'],
            ['nombre' => 'Salta'],
            ['nombre' => 'San Juan'],
            ['nombre' => 'San Luis'],
            ['nombre' => 'Santa Cruz'],
            ['nombre' => 'Santa Fe'],
            ['nombre' => 'Tierra del Fuego'],
            ['nombre' => 'Tucumán'],
            ['nombre' => 'Ciudad Autonoma de B'],
        ];
        

        Provincia::insert($provincias);
    }
} 
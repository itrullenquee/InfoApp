<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Lugar;

class LugarSeeder extends Seeder
{
    public function run(): void
    {
        $lugares = [
            [
                'barrio_id' => 1,
                'calle' => 'Av. Mitre',
                'numero' => '1234',
                'manzana' => 'A',
                'lote' => '1',
                'piso' => '2',
                'dpto' => 'B'
            ],
            [
                'barrio_id' => 2,
                'calle' => 'Av. Güemes',
                'numero' => '567',
                'manzana' => 'B',
                'lote' => '2',
                'piso' => '1',
                'dpto' => 'C'
            ],
            [
                'barrio_id' => 3,
                'calle' => 'Av. San Martín',
                'numero' => '890',
                'manzana' => 'C',
                'lote' => '3',
                'piso' => '3',
                'dpto' => 'D'
            ]
        ];

        foreach ($lugares as $lugar) {
            Lugar::create($lugar);
        }
    }
} 
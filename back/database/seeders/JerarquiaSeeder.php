<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Jerarquia;

class JerarquiaSeeder extends Seeder
{
    public function run(): void
    {
        $nombres = [
            'Agente',
            'Cabo',
            'Cabo Primero',
            'Sargento',
            'Sargento Primero',
            'Sargento Ayudante',
            'Sub Oficial Principal',
            'Oficial Ayudante',
            'Oficial Sub-Inspector',
            'Oficial Inspector',
            'Oficial Principal',
            'Sub Comisario',
            'Comisario',
            'Comisario Inspector',
            'Comisario Mayor',
            'Comisario General',
        ];
    
        $jerarquias = array_map(fn($nombre) => ['nombre' => $nombre], $nombres);
    
        Jerarquia::insert($jerarquias);
    }
    
} 
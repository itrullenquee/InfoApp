<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    public function run(): void
    {
        $categorias = [
            ['nombre' => 'Social'],
            ['nombre' => 'Politica'],
            ['nombre' => 'Policial'],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
} 
<?php

namespace Database\Seeders;

use App\Models\TiposProyectos;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class TiposProyectosSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tipos = [
            ['nombre' => 'Abiertos'],
            ['nombre' => 'Cerrados'],
        ];


        TiposProyectos::insert($tipos);
    }
}

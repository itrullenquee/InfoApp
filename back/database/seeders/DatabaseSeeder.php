<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            ProvinciaSeeder::class,
            DepartamentoSeeder::class,
            LocalidadSeeder::class,
            BarrioSeeder::class,
            CategoriaSeeder::class,
            LugarSeeder::class,
            OficinaSeeder::class,
            JerarquiaSeeder::class,
            DepartamentalSeeder::class,
            DependenciaSeeder::class,
            UserSeeder::class,
            PersonaSeeder::class,
            FuncionarioSeeder::class,
            NovedadSeeder::class,
            TiposProyectosSeeder::class,
            // ProyectoSeeder::class,
            // TareaSeeder::class,
        ]);
    }
}

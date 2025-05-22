<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Funcionario;
use App\Models\Persona;

class FuncionarioSeeder extends Seeder
{
    public function run(): void
    {
        $personas = Persona::all();
        
        foreach ($personas as $persona) {
            Funcionario::create([
                'user_id' => $persona->user_id,
                'jerarquia_id' => rand(1, 3), // Asumiendo que hay 3 jerarquías
                'oficina_id' => rand(1, 3), // Asumiendo que hay 3 oficinas
                'legajo_personal' => 'LEG-' . str_pad($persona->id, 4, '0', STR_PAD_LEFT),
                'estado' => 'activo'
            ]);
        }
    }
} 
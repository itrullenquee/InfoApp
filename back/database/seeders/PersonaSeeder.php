<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Persona;
use App\Models\User;

class PersonaSeeder extends Seeder
{
    public function run(): void
    {
        $users = User::all();
        
        foreach ($users as $user) {
            $nombres = explode(' ', $user->name);
            $apellido = array_pop($nombres);
            $nombre = implode(' ', $nombres);

            Persona::create([
                'user_id' => $user->id,
                'nombre' => $nombre,
                'apellido' => $apellido
            ]);
        }
    }
} 
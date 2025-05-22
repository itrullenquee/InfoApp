<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $users = [
            [
                'name' => 'Juan Pérez',
                'apellido' => 'Pérez',
                'email' => 'juan.perez@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'role' => 'admin',
            ],
            [
                'name' => 'María García',
                'apellido' => 'García',
                'email' => 'maria.garcia@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'role' => 'novedades',
            ],
            [
                'name' => 'Carlos López',
                'apellido' => 'López',
                'email' => 'carlos.lopez@example.com',
                'password' => Hash::make('password123'),
                'email_verified_at' => now(),
                'role' => 'proyectos',
            ]
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
} 
<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Oficina;

class OficinaSeeder extends Seeder
{
    public function run(): void
    {
        $oficinas = [
            [
                'nombre' => 'Oficina Central',
                'descripcion' => 'Centro principal de operaciones y coordinación general.'
            ],
            [
                'nombre' => 'Oficina de Atención al Público',
                'descripcion' => 'Encargada de recibir y asistir a los ciudadanos.'
            ],
            [
                'nombre' => 'Oficina de Administración',
                'descripcion' => 'Responsable de la gestión administrativa y documentación.'
            ],
            [
                'nombre' => 'Oficina de Recursos Humanos',
                'descripcion' => 'Gestiona el personal, nómina, licencias y relaciones laborales.'
            ],
            [
                'nombre' => 'Oficina de Contabilidad',
                'descripcion' => 'Encargada del control financiero y presupuestario.'
            ],
            [
                'nombre' => 'Oficina de Sistemas',
                'descripcion' => 'Área técnica encargada del soporte informático y desarrollo.'
            ],
            [
                'nombre' => 'Oficina de Mantenimiento',
                'descripcion' => 'Se encarga del mantenimiento y reparaciones de la institución.'
            ],
            [
                'nombre' => 'Oficina de Secretaría',
                'descripcion' => 'Asiste en tareas administrativas y coordinación de agendas.'
            ],
        ];

        foreach ($oficinas as $oficina) {
            Oficina::create($oficina);
        }
    }
}

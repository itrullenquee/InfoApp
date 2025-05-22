<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Departamental;

class DepartamentalSeeder extends Seeder
{
    public function run(): void
    {
        $data = [
            [
                'nombre' => 'DEPARTAMENTAL N° 1 - ZONA NORTE',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N° 2'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 5'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 49'],
                    ['nombre' => 'SUB CRIA LOS NUÑEZ'],
                    ['nombre' => 'MUJER Y FLIA N° 11'],
                    ['nombre' => 'DIV. PREVENCION ZONA NORTE'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 2 - ZONA CENTRO',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N° 1'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 6'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 4'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 8'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 1 DE LA MUJER Y LA FLIA'],
                    ['nombre' => 'ESCUADRON TACTICO'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 3 - ZONA SUR',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N° 11'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 45'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 51'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 5 MYF'],
                    ['nombre' => 'DIV. PREVENCION ZONA SUR'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 4 - ZONA OESTE BANDA',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N° 12'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 13'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 15'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 47'],
                    ['nombre' => 'CRIA M.Y FLIA N° 2'],
                    ['nombre' => 'SUB CRIA LA DARSENA'],
                    ['nombre' => 'SUB CRIA LA DARSENA'],
                    ['nombre' => 'SUB CRIA LOS QUIROGA'],
                    ['nombre' => 'DIV. PREVENCION ZONA OESTE BANDA'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL Nº 5 – ZONA ESTE BANDA',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N° 14'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 16'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 56'],
                    ['nombre' => 'SUB COMISARIA ESTACION SIMBOLAR'],
                    ['nombre' => 'SUB COMISARIA BANDERA BAJADA'],
                    ['nombre' => 'DIV. PREVENCION ZONA ESTE BANDA'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL Nº 6 – DPTO. RIO HONDO',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA Nº40'],
                    ['nombre' => 'COMISARIA COMUNITARIA Nº50'],
                    ['nombre' => 'COMISARIA COMUNITARIA Nº57'],
                    ['nombre' => 'COMISARIA COMUNITARIA Nº58'],
                    ['nombre' => 'COMISARIA Nª6 DE LA MUJER Y LA FLIA'],
                    ['nombre' => 'SUBCRIA. DE VILLA RIO HONDO'],
                    ['nombre' => 'SUBCRIA. DE VINARA'],
                    ['nombre' => 'SUBCRIA. DE GRAMILLA'],
                    ['nombre' => 'SECCION ALCAIDIA'],
                    ['nombre' => 'DIV. CRIMINALISTICA'],
                    ['nombre' => 'JEFE DE DPTO'],
                    ['nombre' => 'DESTAC. COSTANERA'],
                    ['nombre' => 'DESTAC. AUTODROMO'],
                    ['nombre' => 'DESTAC. GOLF CLUB'],
                    ['nombre' => 'HOTEL TERMAS UNO'],
                    ['nombre' => 'DIV. PREVENCION RIO HONDO'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 7 FRIAS',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA Nº 23'],
                    ['nombre' => 'CRIA. COM. Nº 3 MUJER Y LA FLIA'],
                    ['nombre' => 'COMISARIA COMUNITARIA N°60'],
                    ['nombre' => 'CRIA COM. Nº 25 SAN PEDRO'],
                    ['nombre' => 'SUB-CRÍA LAVALLE'],
                    ['nombre' => 'SUB-CRIA SANTA CATALINA'],
                    ['nombre' => 'SUB-CRIA VILLA LA PUNTA'],
                    ['nombre' => 'SUB-CRIA CHOYA'],
                    ['nombre' => 'DSTO POLICIAL Nº 15- TAPSO'],
                    ['nombre' => 'DIVISION PREVENCION FRIAS'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTALNº 8 ROBLES- SARMIENTO- FIGUEROA',
                'dependencias' => [
                    ['nombre' => 'COM. Nº 13 MyF'],
                    ['nombre' => 'CRIA. COM. Nº 24 LA CAÑADA'],
                    ['nombre' => 'CRIA. COM. Nº 35 FERNANDEZ'],
                    ['nombre' => 'CRIA. COM. Nº 38 GARZA'],
                    ['nombre' => 'CRIA. COM. Nº 46 BELTRAN'],
                    ['nombre' => 'CRIA. COM. Nº 52 FORRES'],
                    ['nombre' => 'CRIA. COM. Nº 62 VILMER'],
                    ['nombre' => 'SUBCRIA. COM. COLONIA EL SIMBOLAR'],
                    ['nombre' => 'SUBCRIA. COM. VILLA ROBLES'],
                    ['nombre' => 'SUBCRIA. COM. EST. TABOADA'],
                    ['nombre' => 'DIVISION PREVENCION']

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 9 LORETO',
                'dependencias' => [
                    ['nombre' => 'CRIA. COM. N° 7 MYF'],
                    ['nombre' => 'CRIA. COM. N° 20 ATAMISQUI'],
                    ['nombre' => 'CRIA. COM. N° 27 LORETO'],
                    ['nombre' => 'CRIA. COM. N° 36 BREA POZO'],
                    ['nombre' => 'CRIA. COM. N° 37 ARRAGA'],
                    ['nombre' => 'SUB CRIA. COM. LAPRIDA'],
                    ['nombre' => 'SUB CRIA. COM. NUEVA FRANCIA'],
                    ['nombre' => 'SUB CRIA. COM. MEDELLIN'],
                    ['nombre' => 'DIV. PREVENCION LORETO'],

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 10 PELLEGRINI-JIMENEZ',
                'dependencias' => [
                    ['nombre' => 'CRIA 32'],
                    ['nombre' => 'CRIA COMUNITARIA N°26 POZO HONDO'],
                    ['nombre' => 'SUB CRIA DELICIAS'],
                    ['nombre' => 'CRIA COM N°53 EL BOBADAL'],
                    ['nombre' => 'SUB CRIA EL ARENAL'],
                    ['nombre' => 'SUB CRIA EL MOJÓN'],
                    ['nombre' => 'DIVISION PREVENCION PELLEGRINI-JIMENEZ']

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 11 MONTE QUEMADO',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N° 22'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 43 Pampa de los Guanacos'],
                    ['nombre' => 'Destacamento N° 02'],
                    ['nombre' => 'SUB-COMISARIAS: SAN JOSE DEL BOQUERÓN- DPTO COPO'],
                    ['nombre' => 'SUB-COMISARIAS: sachayoj'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 18 CAMPO GALLO DPTO ALBERDI']

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL Nº 12 QUIMILI- MORENO',
                'dependencias' => [
                    ['nombre' => 'Cria Com Nº 29 QUIMILI'],
                    ['nombre' => 'CRIA. COM.28 SUNCHO CORRAL'],
                    ['nombre' => 'Sub Cria MATARA'],
                    ['nombre' => 'Sub Cria Villa VILELAS'],
                    ['nombre' => 'Sub Cria OTUMPA'],
                    ['nombre' => 'Sub Cria WEISBURD'],
                    ['nombre' => 'DIVISIÓN PREV. DSC12'],
                    ['nombre' => 'CRIA. COM. 44 TINTINA']

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL Nº 13 AÑATUYA',
                'dependencias' => [
                    ['nombre' => 'Cria Com Nº 4 Mujer Y Familia'],
                    ['nombre' => 'Cria Com Nº 21 Bandera'],
                    ['nombre' => 'Cria Com Nº 41 Añatuya'],
                    ['nombre' => 'Cria Com Nº 48 Los Juries'],
                    ['nombre' => 'Sub Cria Guardia Escolta'],
                    ['nombre' => 'Sub Cria Tomas Young']

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N°15 14 PINTO',
                'dependencias' => [
                    ['nombre' => 'Cria Com N° 17 Pinto'],
                    ['nombre' => 'Cria Com Nº 34 SELVA'],
                    ['nombre' => 'Cria Com Nº 30 villa unión'],
                    ['nombre' => 'Sub Cria Com Malbran']

                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N°15 - OJO DE AGUA',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N°31 OJO DE AGUA'],
                    ['nombre' => 'COMISARIA COMUNITARIA N°33 SUMAMPA'],
                    ['nombre' => 'COMISARIA COMUNITARIA N° 39 LOS TELARES'],
                    ['nombre' => 'SUBCOMISARIA COMUNITARIA SOL DE JULIO'],
                    ['nombre' => 'SUBCOMISARIA COMUNITARIA VILLA SALAVINA']
                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 16 LOS FLORES',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA Nº 03'],
                    ['nombre' => 'COMISARIA COMUNITARIA Nº 07'],
                    ['nombre' => 'COMISARIA COMUNITARIA Nº 54'],
                    ['nombre' => 'COMISARIA COMUNITARIA Nº 61'],
                    ['nombre' => 'COMISARIA MUJER Y FAMILIA Nº 16'],
                    ['nombre' => 'SUB COMISARIA COSTANERA SUR'],
                    ['nombre' => 'SUB COMISARIA LA COSTA'],
                    ['nombre' => 'SUB COMISARIA MACO']
                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 17 BELEN',
                'dependencias' => [
                    ['nombre' => 'CRIA COMUNITARIA N°9'],
                    ['nombre' => 'CRIA COMUNITARIA N°10'],
                    ['nombre' => 'CRIA COMUNITARIA N°59'],
                    ['nombre' => 'CRIA COMUNITARIA N°17 M Y FLIA'],
                    ['nombre' => 'SUB CRIA SOL DE MAYO']
                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 18 HERRERA',
                'dependencias' => [
                    ['nombre' => 'Cria Com Nº 18 Mujer Y Flia'],
                    ['nombre' => 'Cria Com Nº 19'],
                    ['nombre' => 'Cria Com Nº 42'],
                    ['nombre' => 'Cria Com Nº 55'],
                    ['nombre' => 'Sub Cria Lugones'],
                    ['nombre' => 'Sub Cria Villa Mailin'],
                    ['nombre' => 'Sub Cria Real Sayana']
                ],
            ],
            [
                'nombre' => 'DEPARTAMENTAL N° 19 VILLA DEL CARMEN ',
                'dependencias' => [
                    ['nombre' => 'COMISARIA COMUNITARIA N° 63'],
                    ['nombre' => 'COMISARÍA M Y F 19 '],

                ],
            ],

        ];

        foreach ($data as $departamentalData) {
            $departamental = Departamental::create(['nombre' => $departamentalData['nombre']]);
            foreach ($departamentalData['dependencias'] as $dependenciaData) {
                $departamental->dependencias()->create(['nombre' => $dependenciaData['nombre']]);
            }
        }
    }
} 
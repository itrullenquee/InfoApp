<?php

namespace App\Http\Controllers;

use App\Models\Provincia;
use App\Models\Departamento;
use App\Models\Localidad;
use App\Models\Barrio;
use App\Models\Dependencia;
use App\Models\Lugar;
use Illuminate\Http\Request;

class UbicacionController extends Controller
{

    public function getBarriosPorDepartamento($departamento_id)
    {
        $barrios = Barrio::whereHas('localidad', function ($query) use ($departamento_id) {
            $query->where('departamento_id', $departamento_id);
        })->get();

        return response()->json($barrios);
    }

    public function getProvincias()
    {
        $provincias = Provincia::with('departamentos')->get();
        return response()->json($provincias);
    }

    public function getDepartamentos($provincia_id)
    {
        $departamentos = Departamento::where('provincia_id', $provincia_id)
            ->with('localidades')
            ->get();
        dd($departamentos);
        return response()->json($departamentos);
    }

    public function getLocalidades($departamento_id)
    {
        $localidades = Localidad::where('departamento_id', $departamento_id)
            ->with('barrios')
            ->get();
        return response()->json($localidades);
    }

    public function getBarrios($localidad_id)
    {
        $barrios = Barrio::where('localidad_id', $localidad_id)->get();
        return response()->json($barrios);
    }

    public function storeLugar(Request $request)
    {
        $request->validate([
            'barrio_id' => 'required|exists:barrios,id',
            'calle' => 'required|string',
            'numero' => 'required|string',
            'manzana' => 'nullable|string',
            'lote' => 'nullable|string',
            'piso' => 'nullable|string',
            'dpto' => 'nullable|string',
        ]);

        $lugar = Lugar::create($request->all());
        return response()->json($lugar, 201);
    }

    public function getLugar($id)
    {
        $lugar = Lugar::with(['barrio.localidad.departamento.provincia'])->findOrFail($id);
        return response()->json($lugar);
    }

    public function getDependencias()
    {
        $dependencias = Dependencia::all();
        return response()->json($dependencias);
    }
}

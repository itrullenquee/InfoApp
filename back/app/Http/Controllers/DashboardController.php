<?php

namespace App\Http\Controllers;

use App\Models\Novedad;
use App\Models\Oficina;
use App\Models\Tarea;
use Carbon\Carbon;
use Illuminate\Http\Request;


class DashboardController extends Controller
{


  public function getResumenDashboard()
{
    $hoy = Carbon::today();
    $mes = $hoy->month;
    $anio = $hoy->year;

    return response()->json([
        'novedades_hoy' => Novedad::whereDate('fecha_inicio', $hoy)->count(),
        'novedades_mes' => Novedad::whereMonth('fecha_inicio', $mes)->whereYear('fecha_inicio', $anio)->count(),

        'tareas_completadas' => Tarea::where('estado', 'completada')->count(),
        'tareas_mes' => Tarea::where('estado', 'completada')->whereMonth('fecha_fin', $mes)->whereYear('fecha_fin', $anio)->count(),

        'tareas_pendientes' => Tarea::where('estado', 'pendiente')->count(),

        'oficinas_total' => Oficina::count(),
    ]);
}

  public function getAllNovedadesDashboard(Request $request)
    {
        $query = Novedad::with([
            'funcionario.user',
            'categoria',
            'dependencia',
            'lugar.barrio.localidad.departamento.provincia'
        ]);

        if ($request->has('categoria_id') && $request->categoria_id != '') {
            $query->where('categoria_id', $request->categoria_id);
        }

        if ($request->has('estado') && $request->estado != '') {
            $query->where('estado', $request->estado);
        }

        if ($request->has('funcionario_id') && $request->funcionario_id != '') {
            $query->where('funcionario_id', $request->funcionario_id);
        }

        if ($request->has('desde') && $request->desde != '') {
            $query->whereDate('fecha_inicio', '>=', $request->desde);
        }

        if ($request->has('hasta') && $request->hasta != '') {
            $query->whereDate('fecha_inicio', '<=', $request->hasta);
        }

        $query->orderBy('fecha_inicio', 'desc');

        $novedades = $query->get();

        return response()->json($novedades);
    }

    
}

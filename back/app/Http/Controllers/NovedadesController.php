<?php

namespace App\Http\Controllers;

use App\Models\Barrio;
use App\Models\Categoria;
use App\Models\Departamento;
use App\Models\Localidad;
use Illuminate\Http\Request;
use App\Models\Novedad;
use App\Models\Lugar;
use App\Models\Provincia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Spatie\Activitylog\Models\Activity;

class NovedadesController extends Controller
{
    public function getActividadReciente()
    {
        $actividades = Activity::with('causer')
            ->latest()
            ->take(20)
            ->get()
            ->map(function ($actividad) {
                return [
                    'id' => $actividad->id,
                    'usuario' => $actividad->causer ? $actividad->causer->name : 'Desconocido',
                    'accion' => $actividad->description,
                    'modelo' => class_basename($actividad->subject_type), // Solo "Novedad", "Tarea", etc.
                    'detalles' => $actividad->properties,
                    'fecha' => $actividad->created_at->diffForHumans(), // Ej: "hace 2 horas"
                ];
            });

        return response()->json($actividades);
    }

    public function getProvincias()
    {
        $provincias = Provincia::all();
        if ($provincias->isEmpty()) {
            return response()->json(['error' => 'No se encontraron provincias'], 404);
        }
        return response()->json($provincias);
    }

    public function getDepartamentosForProvince(Request $request)
    {
        $departamentos = Departamento::where('provincia_id', $request->provincia_id)->get();
        return response()->json($departamentos);
    }

    public function getBarriosForDepartamento(Request $request)
    {
        $departamentoId = $request->departamento_id;

        if (!$departamentoId) {
            return response()->json(['error' => 'El departamento_id es requerido'], 400);
        }

        $barrios = Barrio::whereHas('localidad', function ($query) use ($departamentoId) {
            $query->where('departamento_id', $departamentoId);
        })->get();

        if ($barrios->isEmpty()) {
            return response()->json(['error' => 'No se encontraron barrios para este departamento'], 404);
        }

        return response()->json($barrios);
    }





    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'funcionario_id' => 'required',
            'categoria_id' => 'required',
            'dependencia_id' => 'required',
            'barrio_id' => 'required',
            'calle' => 'required',
            'numero' => 'required',
            'manzana' => 'nullable',
            'lote' => 'nullable',
            'piso' => 'nullable',
            'dpto' => 'nullable',
            'titulo' => 'required',
            'descripcion' => 'required',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'pdf' => 'nullable|mimes:pdf|max:2048',
            'estado' => 'required',
        ], [
            'funcionario_id.required' => 'El funcionario es obligatorio.',
            'categoria_id.required' => 'La categoría es obligatoria.',
            'dependencia_id.required' => 'La dependencia es obligatoria.',
            'barrio_id.required' => 'El barrio es obligatorio.',
            'calle.required' => 'La calle es obligatoria.',
            'numero.required' => 'El número es obligatorio.',
            'titulo.required' => 'El título es obligatorio.',
            'descripcion.required' => 'La descripción es obligatoria.',
            'fecha_inicio.required' => 'La fecha de inicio es obligatoria.',
            'fecha_inicio.date' => 'La fecha de inicio debe ser una fecha válida.',
            'fecha_fin.date' => 'La fecha de fin debe ser una fecha válida.',
            'fecha_fin.after_or_equal' => 'La fecha de fin debe ser igual o posterior a la fecha de inicio.',
            'imagen.image' => 'La imagen debe ser un archivo de imagen.',
            'imagen.mimes' => 'La imagen debe ser de tipo: jpeg, png, jpg, gif o svg.',
            'imagen.max' => 'La imagen no debe superar los 2MB.',
            'pdf.mimes' => 'El archivo PDF debe tener formato .pdf.',
            'pdf.max' => 'El PDF no debe superar los 2MB.',
            'estado.required' => 'El estado es obligatorio.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Crear el lugar
        $lugar = Lugar::create([
            'barrio_id' => $request->barrio_id,
            'calle' => $request->calle,
            'numero' => $request->numero,
            'manzana' => $request->manzana,
            'lote' => $request->lote,
            'piso' => $request->piso,
            'dpto' => $request->dpto,
        ]);

        // Crear la novedad
        $novedad = new Novedad();
        $novedad->funcionario_id = $request->funcionario_id;
        $novedad->categoria_id = $request->categoria_id;
        $novedad->dependencia_id = $request->dependencia_id;
        $novedad->lugar_id = $lugar->id;
        $novedad->titulo = $request->titulo;
        $novedad->descripcion = $request->descripcion;
        $novedad->fecha_inicio = $request->fecha_inicio;
        $novedad->fecha_fin = $request->fecha_fin;
        $novedad->estado = $request->estado;

        if ($request->hasFile('imagen')) {
            $path = $request->file('imagen')->store('novedades/imagenes', 'public');
            $novedad->imagen = $path;
        }

        if ($request->hasFile('pdf')) {
            $path = $request->file('pdf')->store('novedades/pdf', 'public');
            $novedad->pdf = $path;
        }

        $novedad->save();
        return response()->json($novedad, 201);
    }

    public function getAllNovedades(Request $request)
    {
        $query = Novedad::with([
            'funcionario.user',
            'categoria',
            'dependencia',
            'lugar.barrio.localidad.departamento.provincia'
        ]);

        // Filtro por categoria_id
        if ($request->filled('categoria_id')) { // filled() es un poco más robusto que has() y != ''
            $query->where('categoria_id', $request->categoria_id);
        }

        // Filtro por estado
        if ($request->filled('estado')) {
            $query->where('estado', $request->estado);
        }

        // Filtro por funcionario_id
        if ($request->filled('funcionario_id')) {
            $query->where('funcionario_id', $request->funcionario_id);
        }

        // Filtro por fecha_inicio desde
        if ($request->filled('desde')) {
            $query->whereDate('fecha_inicio', '>=', $request->desde);
        }

        // Filtro por fecha_inicio hasta
        if ($request->filled('hasta')) {
            $query->whereDate('fecha_inicio', '<=', $request->hasta);
        }

        // ******** AÑADIR ESTA SECCIÓN PARA EL FILTRO DE BÚSQUEDA ********
        if ($request->filled('search')) {
            $searchTerm = $request->search;
            $query->where(function ($q) use ($searchTerm) {
                $q->where('titulo', 'LIKE', "%{$searchTerm}%")
                  ->orWhere('descripcion', 'LIKE', "%{$searchTerm}%");
                // Puedes añadir más campos a la búsqueda aquí:
                // ->orWhereHas('funcionario.user', function ($userQuery) use ($searchTerm) {
                //     $userQuery->where('name', 'LIKE', "%{$searchTerm}%");
                // })
                // ->orWhereHas('categoria', function ($catQuery) use ($searchTerm) {
                //     $catQuery->where('nombre', 'LIKE', "%{$searchTerm}%");
                // });
            });
        }
        // *****************************************************************

        $query->orderBy('created_at', 'desc');

        // Ajusta el número de items por página según necesites
        $perPage = $request->input('per_page', 4); // Permite cambiar el número por página desde el request, default 4
        $novedades = $query->paginate($perPage);

        return response()->json($novedades);
    }    public function getAllNoticias(Request $request)
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

        $query->orderBy('created_at', 'desc');

        $novedades = $query->get();

        return response()->json($novedades);
    }

    public function getNoticiasPorCategoria(Request $request, $categoria_id)
    {
        // Validación básica para asegurar que es un ID numérico
        if (!ctype_digit((string)$categoria_id) || (int)$categoria_id <= 0) {
            return response()->json(['message' => 'El ID de categoría no es válido.'], 400);
        }

        $query = Novedad::with([
            'funcionario.user',
            'categoria', // Es bueno incluir 'categoria' para confirmar en el frontend
            'dependencia',
            'lugar.barrio.localidad.departamento.provincia'
        ])->where('categoria_id', (int)$categoria_id); // Filtrar por categoria_id

        // Filtros opcionales adicionales (estado, fechas) si son necesarios para esta vista
        if ($request->has('estado') && $request->estado != '') {
            $query->where('estado', $request->estado);
        }

        if ($request->has('desde') && $request->desde != '') {
            $query->whereDate('fecha_inicio', '>=', $request->desde);
        }

        if ($request->has('hasta') && $request->hasta != '') {
            $query->whereDate('fecha_inicio', '<=', $request->hasta);
        }

        // Ordenar por fecha_inicio descendente (más recientes primero)
        $query->orderBy('fecha_inicio', 'desc');

        $novedades = $query->get(); // O $query->paginate(10); si necesitas paginación

        // No es necesario devolver 404 si no hay noticias, un array vacío es correcto.
        return response()->json($novedades);
    }

    public function getNovedadById($id)
    {
        $novedad = Novedad::with(['funcionario', 'categoria', 'dependencia', 'lugar.barrio.localidad.departamento.provincia'])
            ->findOrFail($id);
        return response()->json($novedad);
    }


    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'funcionario_id' => 'required',
            'categoria_id' => 'required',
            'dependencia_id' => 'required',
            'barrio_id' => 'required',
            'calle' => 'required',
            'numero' => 'required',
            'manzana' => 'nullable',
            'lote' => 'nullable',
            'piso' => 'nullable',
            'dpto' => 'nullable',
            'titulo' => 'required',
            'descripcion' => 'required',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio',
            'imagen' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
            'pdf' => 'nullable|mimes:pdf|max:2048',
            'estado' => 'required',
        ]);



        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Buscar la novedad existente
        $novedad = Novedad::find($id);

        if (!$novedad) {
            return response()->json(['error' => 'Novedad no encontrada'], 404);
        }

        // Actualizar el lugar
        $novedad->lugar->update([
            'barrio_id' => $request->barrio_id,
            'calle' => $request->calle,
            'numero' => $request->numero,
            'manzana' => $request->manzana,
            'lote' => $request->lote,
            'piso' => $request->piso,
            'dpto' => $request->dpto,
        ]);

        // Actualizar la novedad
        $novedad->funcionario_id = $request->funcionario_id;
        $novedad->categoria_id = $request->categoria_id;
        $novedad->dependencia_id = $request->dependencia_id;
        $novedad->titulo = $request->titulo;
        $novedad->descripcion = $request->descripcion;
        $novedad->fecha_inicio = $request->fecha_inicio;
        $novedad->fecha_fin = $request->fecha_fin;
        $novedad->estado = $request->estado;

        // Si hay una nueva imagen, reemplazar la existente
        if ($request->hasFile('imagen')) {
            // Borrar la imagen vieja si existe
            if ($novedad->imagen) {
                Storage::disk('public')->delete($novedad->imagen);
            }
            // Subir la nueva imagen
            $path = $request->file('imagen')->store('novedades/imagenes', 'public');
            $novedad->imagen = $path;
        }

        // Si hay un nuevo archivo PDF, reemplazar el existente
        if ($request->hasFile('pdf')) {
            // Borrar el archivo viejo si existe
            if ($novedad->pdf) {
                Storage::disk('public')->delete($novedad->pdf);
            }
            // Subir el nuevo archivo PDF
            $path = $request->file('pdf')->store('novedades/pdf', 'public');
            $novedad->pdf = $path;
        }

        // Guardar la novedad actualizada
        $novedad->save();

        return response()->json($novedad, 200);
    }



    public function deleteNovedad($id)
    {
        try {
            $novedad = Novedad::findOrFail($id);

            if ($novedad->imagen && Storage::disk('public')->exists($novedad->imagen)) {
                Storage::disk('public')->delete($novedad->imagen);
            }

            if ($novedad->pdf && Storage::disk('public')->exists($novedad->pdf)) {
                Storage::disk('public')->delete($novedad->pdf);
            }

            $lugar = $novedad->lugar;
            $novedad->delete();

            if ($lugar) {
                $lugar->delete();
            }

            return response()->json(['message' => 'Novedad eliminada correctamente'], 204);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Error al eliminar la novedad: ' . $e->getMessage()], 500);
        }
    }


    public function getCategorias()
    {
        $categorias = Categoria::all();
        return response()->json($categorias);
    }
}

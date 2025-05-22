<?php

namespace App\Http\Controllers;

use App\Models\Proyecto;
use App\Models\Tarea;
use App\Models\FuncionariosXTarea;
use App\Models\TiposProyectos;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TareasController extends Controller
{
    // Métodos para Proyectos
    public function getProyectos()
    {
        $proyectos = Proyecto::all();

        return response()->json([
            'data' => $proyectos,
            'message' => $proyectos->isEmpty() ? 'No hay proyectos' : 'Proyectos encontrados',
        ]);
    }


    public function storeProyecto(Request $request)
    {
        $messages = [
            'tipo_id.required' => 'El campo tipo de proyecto es obligatorio.',
            'titulo.required' => 'El campo título es obligatorio.',
            'titulo.string' => 'El campo título debe ser una cadena de texto.',
            'titulo.max' => 'El campo título no debe exceder los 255 caracteres.',
            'descripcion.required' => 'El campo descripción es obligatorio.',
            'descripcion.string' => 'El campo descripción debe ser una cadena de texto.',
            'fecha_inicio.required' => 'El campo fecha de inicio es obligatorio.',
            'fecha_inicio.date' => 'El campo fecha de inicio no es una fecha válida.',
            'fecha_fin.required' => 'El campo fecha de fin es obligatorio.',
            'fecha_fin.date' => 'El campo fecha de fin no es una fecha válida.',
            'fecha_fin.after' => 'La fecha de fin debe ser posterior a la fecha de inicio.',
        ];

        $validator = Validator::make($request->all(), [
            'tipo_id' => 'required|integer|exists:tipos_proyectos,id', // Assuming 'tipos_proyectos' is your table and 'id' is the column
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_inicio' => 'nullable|date', // Making it nullable as per frontend logic
            'fecha_fin' => 'nullable|date|after_or_equal:fecha_inicio', // Use after_or_equal if end date can be same as start
        ], $messages);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $validatedData = $validator->validated(); // Get validated data

        // Handle null dates correctly before creating
        $dataToCreate = [
            'tipo_id' => $validatedData['tipo_id'],
            'titulo' => $validatedData['titulo'],
            'descripcion' => $validatedData['descripcion'],
            'estado' => $request->input('estado', 'pendiente'), // Get estado from request or default
            'fecha_inicio' => $validatedData['fecha_inicio'] ?? null,
            'fecha_fin' => $validatedData['fecha_fin'] ?? null,
        ];


        $proyecto = Proyecto::create($dataToCreate);

        return response()->json($proyecto, 201);
    }
    public function getTareasByProyecto($proyecto_id)
    {
        $tareas = Tarea::where('proyecto_id', $proyecto_id)->with(['funcionarios.user' => function ($query) {
            $query->select('id', 'name', 'apellido', 'email');
        }])->get();
        return response()->json($tareas);
    }
    public function showProyecto($id)
    {
        $proyecto = Proyecto::findOrFail($id);
        return response()->json($proyecto);
    }

    public function updateProyecto(Request $request, $id)
    {
        $proyecto = Proyecto::findOrFail($id);
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_inicio' => 'required|date',
            'fecha_fin' => 'required|date|after:fecha_inicio',
            'estado' => 'required|string',
            'tipo_id' => 'required',
        ]);

        $proyecto->update($request->all());
        return response()->json($proyecto);
    }

    public function destroyProyecto($id)
    {
        $proyecto = Proyecto::findOrFail($id);
        $proyecto->delete();
        return response()->json(null, 204);
    }


    public function storeTarea(Request $request)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_fin' => 'required|date',
            'estado' => 'required|string',
            'funcionario_id' => 'required|array|min:1',
            'funcionario_id.*' => 'exists:funcionarios,id',
            'proyecto_id' => 'required|exists:proyectos,id',
        ]);


        try {
            $tarea = new Tarea();
            $tarea->proyecto_id = $request->proyecto_id;
            $tarea->titulo = $request->titulo;
            $tarea->descripcion = $request->descripcion;
            $tarea->fecha_fin = $request->fecha_fin;
            $tarea->estado = $request->estado;
            $tarea->save();

            foreach ($request->funcionario_id as $id) {
                $funcionarioXTarea = new FuncionariosXTarea();
                $funcionarioXTarea->funcionario_id = $id;
                $funcionarioXTarea->tarea_id = $tarea->id;
                $funcionarioXTarea->save();
            }
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Error al crear la tarea', 'error' => $th->getMessage()], 500);
        }

        return response()->json($tarea, 201);
    }


    public function showTarea($proyecto_id, $id)
    {
        $tarea = Tarea::where('proyecto_id', $proyecto_id)->with('funcionarios')->findOrFail($id);
        return response()->json($tarea);
    }

    public function updateTarea(Request $request, $proyecto_id, $id)
    {
        $request->validate([
            'titulo' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'fecha_fin' => 'required|date',
            'funcionario_id' => 'required|array|min:1',
            'funcionario_id.*' => 'exists:funcionarios,id',
            'proyecto_id' => 'required|exists:proyectos,id',
        ]);

        try {
            $tarea = Tarea::findOrFail($id);
            $tarea->proyecto_id = $request->proyecto_id;
            $tarea->titulo = $request->titulo;
            $tarea->descripcion = $request->descripcion;
            $tarea->fecha_fin = $request->fecha_fin;
            $tarea->estado = $request->estado;
            $tarea->save(); // Usar save() en lugar de update() para guardar el modelo

            // Eliminar las relaciones existentes
            FuncionariosXTarea::where('tarea_id', $id)->delete();

            // Crear las nuevas relaciones
            foreach ($request->funcionario_id as $funcionarioId) {
                FuncionariosXTarea::create([
                    'funcionario_id' => $funcionarioId,
                    'tarea_id' => $tarea->id
                ]);
            }

            return response()->json($tarea, 200);
        } catch (\Throwable $th) {
            return response()->json(['message' => 'Error al actualizar la tarea', 'error' => $th->getMessage()], 500);
        }
    }
    public function updateEstadoTarea(Request $request, $proyecto_id, $id)
    {
        $request->validate([
            'estado' => 'required|string|in:pendiente,en_progreso,completada'
        ]);

        try {
            $tarea = Tarea::where('proyecto_id', $proyecto_id)->findOrFail($id);
            $tarea->estado = $request->estado;
            $tarea->save();

            return response()->json($tarea, 200);
        } catch (\Throwable $th) {
            return response()->json([
                'message' => 'Error al actualizar el estado de la tarea',
                'error' => $th->getMessage()
            ], 500);
        }
    }

    public function destroyTarea($proyecto_id, $id)
    {
        $tarea = Tarea::where('proyecto_id', $proyecto_id)
            ->findOrFail($id);
        $tarea->delete();
        return response()->json(null, 204);
    }


    public function obtenerFuncionariosTarea($tarea_id)
    {
        $tarea = Tarea::findOrFail($tarea_id);
        $funcionarios = $tarea->funcionarios()->with('user')->with('jerarquia')->get();

        return response()->json($funcionarios);
    }

    public function getTiposProyectos()
    {
        $tipos = TiposProyectos::all();
        return response()->json($tipos, 200);
    }
}

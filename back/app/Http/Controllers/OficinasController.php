<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use App\Models\Oficina;
use App\Models\User;
use Illuminate\Http\Request;

class OficinasController extends Controller
{
    public function getOficinas()
    {
        $oficinas = Oficina::all();
        if ($oficinas->isEmpty()) {
            return response()->json(['message' => 'No hay oficinas'], 404);
        } else {
            return response()->json(['message' => 'Oficinas encontradas correctamente', 'oficinas' => $oficinas], 200);
        }
    }

    public function getOficinaById($id)
    {
        $oficina = Oficina::find($id);
        if ($oficina) {
            return response()->json(['message' => 'Oficina encontrada correctamente', 'oficina' => $oficina], 200);
        } else {
            return response()->json(['message' => 'No hay oficina con ese id'], 404);
        }
    }


    public function getOficinasConFuncionarios()
    {
        $oficinas = Oficina::withCount('funcionarios')->get();

        if ($oficinas->isEmpty()) {
            return response()->json(['message' => 'No hay oficinas'], 404);
        }

        return response()->json([
            'message' => 'Oficinas encontradas correctamente',
            'oficinas' => $oficinas,
        ], 200);
    }

    public function getOficinasConFuncionariosById($id)
    {
        $oficina = Oficina::with([
            'funcionarios.user' 
        ])->withCount('funcionarios')->findOrFail($id);

        return response()->json([
            'message' => 'Oficina encontrada correctamente',
            'oficina' => $oficina
        ]);
    }
    public function getFuncionariosByOficinaId($id)
    {
        $funcionarios = Funcionario::with('user') 
            ->where('oficina_id', $id)
            ->get();

        if ($funcionarios->isEmpty()) {
            return response()->json(['message' => 'No hay funcionarios en esta oficina'], 404);
        }

        return response()->json([
            'message' => 'Funcionarios encontrados correctamente',
            'funcionarios' => $funcionarios
        ], 200);
    }


    public function createOficina(Request $request)
    {
        $oficina = Oficina::create($request->all());
        if ($oficina) {
            return response()->json(['message' => 'Oficina creada correctamente', 'oficina' => $oficina], 200);
        } else {
            return response()->json(['message' => 'Error al crear la oficina'], 400);
        }
    }

    public function updateOficina(Request $request, $id)
    {
        $oficina = Oficina::find($id);
        if ($oficina) {
            $oficina->update($request->all());
            return response()->json(['message' => 'Oficina actualizada correctamente', 'oficina' => $oficina], 200);
        } else {
            return response()->json(['message' => 'Error al actualizar la oficina'], 400);
        }
    }

    public function deleteOficina($id)
    {
        $oficina = Oficina::find($id);
    
        if ($oficina) {
            $oficina->delete();
            return response()->json(['message' => 'Oficina eliminada correctamente', 'oficina' => $oficina], 200);
        } else {
            return response()->json(['message' => 'Error al eliminar la oficina'], 400);
        }
    }
    
}

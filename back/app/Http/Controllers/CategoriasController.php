<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class CategoriasController extends Controller
{
    public function getCategorias(Request $request)
    {
        $query = $request->input('q');

        $categorias = Categoria::when($query, function ($qBuilder) use ($query) {
            $qBuilder->where('nombre', 'like', '%' . $query . '%');
        })->get();

        if ($categorias->isEmpty()) {
            return response()->json(['error' => 'No se encontraron categorías'], 404);
        }

        return response()->json($categorias);
    }


    public function getCategoria($id)
    {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            return response()->json(['error' => 'No se encontró la categoria'], 404);
        }
        return response()->json($categoria);
    }


    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'nombre' => [
                'required',
                'string',
                'max:255',
                'unique:categorias,nombre',
            ],
        ], [
            'nombre.unique' => 'La categoría ya existe.',
            'nombre.required' => 'El nombre es obligatorio.',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $categoria = Categoria::create($request->all());

        return response()->json([
            'message' => 'Categoría creada con éxito.',
            'categoria' => $categoria
        ], 201);
    }

    public function updateCategoria(Request $request, $id)
    {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            return response()->json(['error' => 'No se encontró la categoria'], 404);
        }

        $validator = Validator::make($request->all(), [
            'nombre' => [
                'required',
                'string',
                'max:255',
                'unique:categorias,nombre',
            ],
        ], [
            'nombre.unique' => 'La categoría ya existe.',
            'nombre.required' => 'El nombre es obligatorio.',
        ]);
        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $categoria->update($request->all());
        return response()->json($categoria, 200);
    }

    public function deleteCategoria($id)
    {
        $categoria = Categoria::find($id);
        if (!$categoria) {
            return response()->json(['error' => 'No se encontró la categoria'], 404);
        }

        $categoria->delete();
        return response()->json(['message' => 'Categoria eliminada con éxito'], 200);
    }
}

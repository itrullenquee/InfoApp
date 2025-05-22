<?php

namespace App\Http\Controllers;

use App\Models\Funcionario;
use App\Models\Jerarquia;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Tymon\JWTAuth\Facades\JWTAuth;

class UsuariosController extends Controller
{
    public function getUsuarios()
    {
        $usuarios = User::all();
        return response()->json(['message' => 'Usuarios encontrados correctamente', 'usuarios' => $usuarios], 200);
    }

    public function getUsuarioById($id)
    {
        $usuario = User::with('funcionario')->with('funcionario.oficina')->with('funcionario.jerarquia')->find($id);
        return response()->json(['message' => 'Usuario encontrado correctamente', 'usuario' => $usuario], 200);
    }


public function getFuncionariosByUser(Request $request)
{
    $query = Funcionario::with([
        'user' => function ($query) {
            $query->select('id', 'name', 'apellido', 'email','role', 'created_at');
        },
        'oficina' => function ($query) {
            $query->select('id', 'nombre');
        },
        'jerarquia' => function ($query) {
            $query->select('id', 'nombre');
        }
    ])->select('id', 'user_id', 'oficina_id', 'jerarquia_id', 'legajo_personal', 'estado');

    if ($request->filled('estado')) {
        $query->where('estado', $request->estado);
    }

    if ($request->filled('oficina_id')) {
        $query->where('oficina_id', $request->oficina_id);
    }

    if ($request->filled('search')) {
        $search = $request->search;
        $query->whereHas('user', function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('apellido', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        });
    }

    $funcionarios = $query->get();

    return response()->json([
        'message' => 'Funcionarios encontrados correctamente',
        'funcionarios' => $funcionarios
    ], 200);
}



    public function createUsuario(Request $request)
    {
        $mensajes = [
            'name.required' => 'El nombre es obligatorio.',
            'apellido.required' => 'El apellido es obligatorio.',
            'email.required' => 'El correo electrónico es obligatorio.',
            'email.email' => 'El correo electrónico no tiene un formato válido.',
            'email.unique' => 'El correo electrónico ya está en uso.',
            'password.required' => 'La contraseña es obligatoria.',
            'password.min' => 'La contraseña debe tener al menos 8 caracteres.',
            'jerarquia_id.required' => 'La jerarquía es obligatoria.',
            'oficina_id.required' => 'La oficina es obligatoria.',
            'legajo_personal.required' => 'El legajo personal es obligatorio.',
            'estado.required' => 'El estado es obligatorio.',
            'role.required' => 'El rol es obligatorio.',
        ];

        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'apellido' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|min:8',
            'jerarquia_id' => 'required',
            'oficina_id' => 'required',
            'legajo_personal' => 'required',
            'estado' => 'required',
            'role' => 'required',
        ], $mensajes);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $usuario = new User();
        $usuario->name = $request->name;
        $usuario->apellido = $request->apellido;
        $usuario->email = $request->email;
        $usuario->password = Hash::make($request->password);
        $usuario->role = $request->role;
        $usuario->save();

        $funcionario = new Funcionario();
        $funcionario->user_id = $usuario->id;
        $funcionario->jerarquia_id = $request->jerarquia_id;
        $funcionario->oficina_id = $request->oficina_id;
        $funcionario->legajo_personal = $request->legajo_personal;
        $funcionario->estado = $request->estado;

        $funcionario->save();

        return response()->json(['message' => 'Usuario creado correctamente', 'usuario' => $usuario], 200);
    }


    public function getUserAuth()
    {
        try {
            if (!$user = JWTAuth::parseToken()->authenticate()) {
                return response()->json(['error' => 'Usuario no encontrado'], 404);
            }
            $user->load('funcionario');
        } catch (\Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {
            return response()->json(['error' => 'Token expirado'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {
            return response()->json(['error' => 'Token inválido'], 401);
        } catch (\Tymon\JWTAuth\Exceptions\JWTException $e) {
            return response()->json(['error' => 'Token no enviado'], 401);
        }

        return response()->json(['message' => 'Usuario autenticado correctamente', 'usuario' => $user], 200);
    }

    public function updateUsuario(Request $request, $id)
    {
        // Validar los datos de entrada
        $validator = Validator::make($request->all(), [
            'name' => 'required',
            'apellido' => 'required',
            'email' => 'required|email|unique:users,email,' . $id,
            'jerarquia_id' => 'required',
            'oficina_id' => 'required',
            'legajo_personal' => 'required',
            'estado' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // Buscar el usuario existente
        $usuario = User::findOrFail($id);

        // Actualizar datos del usuario
        $usuario->name = $request->name;
        $usuario->apellido = $request->apellido;
        $usuario->email = $request->email;

        // Solo actualizar contraseña si se proporciona una nueva
        if ($request->has('password') && !empty($request->password)) {
            $usuario->password = Hash::make($request->password);
        }

        $usuario->save();

        // Actualizar datos del funcionario asociado
        $funcionario = Funcionario::where('user_id', $usuario->id)->first();

        if ($funcionario) {
            $funcionario->jerarquia_id = $request->jerarquia_id;
            $funcionario->oficina_id = $request->oficina_id;
            $funcionario->legajo_personal = $request->legajo_personal;
            $funcionario->estado = $request->estado;
            $funcionario->save();
        }

        return response()->json(['message' => 'Usuario actualizado correctamente', 'usuario' => $usuario], 200);
    }

    public function deleteUsuario($id)
    {
        $usuario = User::findOrFail($id);

        // Eliminar el funcionario asociado
        $funcionario = Funcionario::where('user_id', $usuario->id)->first();
        if ($funcionario) {
            $funcionario->delete();
        }

        // Eliminar el usuario
        $usuario->delete();

        return response()->json(['message' => 'Usuario y funcionario eliminados correctamente'], 200);
    }


    public function getJerarquias()
    {
        $jerarquias = Jerarquia::all();
        return response()->json(['message' => 'Jerarquias encontradas correctamente', 'jerarquias' => $jerarquias], 200);
    }
}

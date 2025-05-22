<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use Illuminate\Support\Facades\Log;
use Tymon\JWTAuth\Facades\JWTAuth;
;


class AuthController extends Controller
{
    public function register(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string',
            'email' => 'required|string|unique:users,email',
            'password' => 'required|string|confirmed',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password),
        ]);
        return response()->json(['message' => 'Usuario creado correctamente'], 201);
    }

      public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string',
            'password' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }

        $credentials = $request->only(['email', 'password']);
        try {
            if (!$token = JWTAuth::attempt($credentials)) {
                return response()->json(['message' => 'Credenciales incorrectas'], 401);
            }
            $user = JWTAuth::user();
            return response()->json([
                'token' => $token,
                'user' => $user
            ], 200);
        } catch (JWTException $e) {
            return response()->json([
                'message' => 'No se pudo crear el token',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    public function getUser()
    {
        try {
            if (!$user = Auth::user()) {
                return response()->json(['message' => 'Usuario no autenticado'], 401);
            }

            $user->load('funcionario');

            return response()->json($user, 200);
        } catch (\Throwable $e) {
        Log::error('Error en getUser: ' . $e->getMessage());
            return response()->json(['message' => 'Error interno del servidor'], 500);
        }
    }


    public function logout()
    {
        try {
            JWTAuth::invalidate(JWTAuth::getToken());
            return response()->json(['message' => 'Sesión cerrada correctamente'], 200);
        } catch (JWTException $e) {
            return response()->json(['message' => 'Error al cerrar sesión', 'error' => $e->getMessage()], 500); // Manejo de excepciones agregado
        }
    }
}

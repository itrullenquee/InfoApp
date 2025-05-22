<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoriasController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NovedadesController;
use App\Http\Controllers\OficinasController;
use App\Http\Controllers\TareasController;
use App\Http\Controllers\UsuariosController;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\UbicacionController;

Route::middleware('jwt.auth')->group(function () {
    Route::get('/user', function () {
        $user = Auth::user()->load('funcionario');
        return response()->json($user);
    });

    Route::controller(NovedadesController::class)->group(function () {
        Route::post('novedades', 'store');
        Route::get('novedades', 'getAllNovedades');
        Route::get('noticias', 'getAllNoticias');
        Route::get('novedades/{id}', 'getNovedadById');
        Route::put('novedades/{id}', 'update');
        Route::delete('novedades/{id}', 'deleteNovedad');
        Route::get('categorias', 'getCategorias');
        Route::get('provincias', 'getProvincias');
        Route::get('departamentos/{provincia_id}', 'getDepartamentosForProvince');
        Route::get('barrios/{departamento_id}', 'getBarriosForDepartamento');
        Route::get('novedadesLog/actividad', 'getActividadReciente');
        Route::get('novedades-categoria/{id}', 'getNoticiasPorCategoria');
        
    });

    Route::controller(OficinasController::class)->group(function () {
        Route::get('oficinas', 'getOficinas');
        Route::get('oficinas/{id}', 'getOficinaById');
        Route::post('oficinas', 'createOficina');
        Route::put('oficinas/{id}', 'updateOficina');
        Route::delete('oficinas/{id}', 'deleteOficina');
        Route::get('oficinas-con-funcionarios', 'getOficinasConFuncionarios');
        Route::get('oficinas-con-funcionarios/{id}', 'getOficinasConFuncionariosById');
        Route::get('oficinas-con-funcionarios/{id}/funcionarios', 'getFuncionariosByOficinaId');
    });

    Route::controller(TareasController::class)->group(function () {
        Route::get('proyectos', 'getProyectos');
        Route::post('proyectos', 'storeProyecto');
        Route::get('proyectos/{id}', 'showProyecto');
        Route::put('proyectos/{id}', 'updateProyecto');
        Route::delete('proyectos/{id}', 'destroyProyecto');

        Route::get('proyectos/{proyecto_id}/tareas', 'getTareasByProyecto');
        Route::post('proyectos/tareas', 'storeTarea');
        Route::get('proyectos/{proyecto_id}/tareas/{id}', 'showTarea');
        Route::put('proyectos/{proyecto_id}/tareas/{id}', 'updateTarea');
        Route::delete('proyectos/{proyecto_id}/tareas/{id}', 'destroyTarea');

        Route::post('tareas/{tarea_id}/funcionarios', 'asignarFuncionarios');
        Route::get('tareas/{tarea_id}/funcionarios', 'obtenerFuncionariosTarea');
        Route::get('tipos-proyectos', 'getTiposProyectos');
        Route::put('proyectos/{proyecto_id}/tareas/{id}/estado', 'updateEstadoTarea');
    });

    Route::controller(UsuariosController::class)->group(function () {
        Route::get('usuarios', 'getUsuarios');
        Route::get('usuarios/{id}', 'getUsuarioById');
        Route::post('usuarios', 'createUsuario');
        Route::put('usuarios/{id}', 'updateUsuario');
        Route::delete('usuarios/{id}', 'deleteUsuario');
        Route::get('funcionarios', 'getFuncionariosByUser');
        Route::get('jerarquias', 'getJerarquias');
        Route::get('user-auth', 'getUserAuth');
    });

    Route::controller(UbicacionController::class)->group(function () {
        Route::get('provincias', 'getProvincias');
        Route::get('provincias/{provincia_id}/departamentos', 'getDepartamentos');
        Route::get('departamentos/{departamento_id}/localidades', 'getLocalidades');
        Route::get('localidades/{localidad_id}/barrios', 'getBarrios');
        Route::post('lugares', 'storeLugar');
        Route::get('lugares/{id}', 'getLugar');
        Route::get('dependencias', 'getDependencias');
        Route::get('barrios/{departamento_id}', 'getBarriosPorDepartamento');
    });

    Route::controller(CategoriasController::class)->group(function () {
        Route::get('categorias', 'getCategorias');
        Route::get('categorias/{id}', 'getCategoria');
        Route::post('categorias', 'store');
        Route::put('categorias/{id}', 'updateCategoria');
        Route::delete('categorias/{id}', 'deleteCategoria');
    });
});


Route::controller(AuthController::class)->group(function () {
    Route::post('register', 'register');
    Route::post('login', 'login');
    Route::post('logout', 'logout'); 
});

Route::controller(DashboardController::class)->group(function () {
    Route::get('dashboard/resumen', 'getResumenDashboard');
    Route::get('dashboard/novedadesDashboard', 'getAllNovedadesDashboard');
    Route::get('dashboard/tareasDashboard', 'getAllTareasDashboard');
});
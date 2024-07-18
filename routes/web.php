<?php

use App\Http\Controllers\PokemonController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [PokemonController::class, 'home'])->name('home');
Route::get('/detail/{name}', [PokemonController::class, 'detail'])->name('detail');

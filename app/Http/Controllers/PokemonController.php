<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class PokemonController extends Controller
{
    /**
     * Display the pokemon view.
     */
    public function home() {
        return Inertia::render('Home');
    }
    /**
     * Show the detail view for a specific Pokemon.
     *
     * @param  string  $id  The ID of the Pokemon.
     * @return \Inertia\Response
     */
    public function  detail ($name) {
        return Inertia::render('Detail', [
            'pokemon' => $name
        ]);
    }
}

<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function form ()
    {
        return Inertia::render('Contact');
    }

    public function send(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        Mail::raw($request->message, function ($message) use ($request) {
            $message->to('soporte@tuapp.com')->subject('Nuevo mensaje de contacto de '.$request->name)->from($request->email, $request->name);
        });

        return redirect()->back()->with('status', 'The email has been sent');
    }
}

<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Mail\ReciveContact;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;

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

        Mail::to('agonzalezgo25dw@ikzubirimanteo.com')->send(new ReciveContact( $request->name, $request->email, $request->message));

        return redirect()->back()->with('status', 'The email has been sent');
    }
}

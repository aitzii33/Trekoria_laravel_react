<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ProfileController extends Controller
{
    //for the form, to soft delete(the profile) and the modifications(username, password)
    public function form()
    {
        return Inertia::render('MyProfile');
    }

    public function SoftDelete(Request $request)
    {
        //delete the profile but it can be recover 
    }

    public function Modify(Request $request)
    {
        //modificationsof the username and password
    }
}

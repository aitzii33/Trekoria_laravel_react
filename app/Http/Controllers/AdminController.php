<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class AdminController extends Controller
{
    public function index() 
    {
        return Inertia::render('Admin/Dashboard');
    }
    

    public function createfromfile(Request $request)
    {
        $request->validate([
            'usuarios' => 'required|array|min:1',
            'usuarios.*.name' => 'required|string|max:100',
            'usuarios.*.last_name' => 'required|string|max:100',
            'usuarios.*.user_name' => 'nullable|string|max:50|unique:users',
            'usuarios.*.email' => 'required|email|unique:users',
            'usuarios.*.password' => 'required|string|min:6',
            'usuarios.*.birth_day' => 'nullable|date',
            'usuarios.*.type_user_id' => 'required|exists:type_users,id'
        ]);

        $create = 0;
        $errores = [];

        DB::beginTransaction();
        try 
        {
            foreach ($request->usuarios as $index => $userData) 
            {
                try 
                {
                    User::create([
                        'name' => $userData['name'],
                        'last_name' => $userData['last_name'],
                        'user_name' => $userData['user_name'] ?? null,
                        'email' => $userData['email'],
                        'password' => Hash::make($userData['password']),
                        'birth_day' => $userData['birth_day'] ?? null,
                        'image' => null,
                        'type_user_id' => $userData['type_user_id'],
                        'email_verified_at' => now()
                    ]);
                    $create++;
                } 
                catch (\Exception $e) 
                {
                    $errores[] = "Line " . ($index + 1) . ": " . $e->getMessage();
                }
            }
            DB::commit();
        } 
        catch (\Exception $e) 
        {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Error: ' . $e->getMessage(),
                'errores' => $errores
            ], 500);
        }

        return response()->json([
            'success' => true,
            'message' => "They have been crated succesfully $create",
            'total' => $create,
            'errores' => $errores
        ]);
    }
}

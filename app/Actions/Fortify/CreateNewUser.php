<?php

namespace App\Actions\Fortify;

use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Validator;
use Laravel\Fortify\Contracts\CreatesNewUsers;

class CreateNewUser implements CreatesNewUsers
{
    public function create(array $input): User
    {
        Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'username' => ['required', 'string', 'max:255', 'unique:users,user_name'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users,email'],
            'birthday' => ['required', 'date', 'before:-18 years'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
        ])->validate();

        return User::create([
            'name' => $input['name'],
            'last_name' => null,
            'user_name' => $input['username'],
            'email' => $input['email'],
            'birth_day' => $input['birthday'],
            'password' => Hash::make($input['password']), // must hash
            'type_user' => 1, // default normal user
            'pending_token' => Str::uuid(),
            'pending_until' => now()->addHour(),
            'remember_token' => Str::random(10),
        ]);
    }
}

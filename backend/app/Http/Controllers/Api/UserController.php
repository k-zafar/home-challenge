<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;
use \Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    public function register(RegisterRequest $request): JsonResponse
    {
        $user = $this->createUser($request);

        event(new Registered($user));

        return $this->createToken($user);
    }

    public function login(): JsonResponse
    {
        return $this->authorisedUser() ? $this->createToken(Auth::user()) : $this->unauthorised();
    }

    protected function createUser($request)
    {
        return User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => bcrypt($request->password)
        ]);
    }

    protected function createToken($user): JsonResponse
    {
        return response()->json([
            'token' => $user->createToken('token')->accessToken
        ], Response::HTTP_CREATED);
    }

    protected function authorisedUser(): bool
    {
        return Auth::attempt(['email' => request('email'), 'password' => request('password')]);
    }

    protected function unauthorised(): JsonResponse
    {
        return response()->json(['error' => 'Unauthorised'], 401);
    }
}

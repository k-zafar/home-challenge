<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RegisterRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Requests\ResetPasswordRequest;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\Response;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

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

    public function updateUser(UpdateUserRequest $request): JsonResponse
    {
        Auth::user()->update(['name' => $request->name]);
        return response()->json(['message' => 'User has updated successfully.']);
    }

    public function resetPassword(ResetPasswordRequest $request): JsonResponse
    {
        $user = Auth::user();

        if (!Hash::check($request->current_password, $user->password)) {
            return response()->json(['error' => 'Current password is incorrect.']);
        }

        $user->update(['password' =>  bcrypt($request->new_password)]);

        return response()->json(['message' => 'Password updated successfully.']);
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

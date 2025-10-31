<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Http\Requests\User\UserLoginRequest;
use App\Models\User;
use App\Notifications\LoginNotification;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * User login endpoint
     *
     * @param UserLoginRequest $request
     * @return JsonResponse
     */
    public function login(UserLoginRequest $request): JsonResponse
    {
        $credentials = $request->only('email', 'password');

        if (!$token = Auth::guard('web')->attempt($credentials)) {
            return response()->json([
                'success' => false,
                'message' => 'Invalid credentials'
            ], 401);
        }

        // Check if account is active
        $user = User::where('email', $request->email)->first();
        if (!$user || $user->status != 1) {
            return response()->json([
                'success' => false,
                'message' => 'Your account is inactive. Please contact administrator.'
            ], 401);
        }

        // Get user details
        $user = Auth::guard('web')->user();

        // Send login notification
        $user->notify(new LoginNotification(
            $request->ip(),
            $request->userAgent(),
            false // not admin
        ));

        // Only include specific fields
        $userData = [
            'id' => $user->id,
            'full_name' => $user->first_name . ' ' . $user->last_name,
            'email' => $user->email,
            'avatar' => $user->avatar ?? null,
            'role' => 'user'
        ];

        return response()->json([
            'success' => true,
            'message' => 'Login successful',
            'data' => [
                'user' => $userData,
                'access_token' => $token,
                'token_type' => 'bearer',
                'expires_in' => auth('web')->factory()->getTTL() * 60 // Token expiration in seconds
            ]
        ], 200);
    }

    /**
     * Logout user
     *
     * @return JsonResponse
     */
    public function logout(): JsonResponse
    {
        Auth::guard('web')->logout();

        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }
}
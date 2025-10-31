<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\AdminLoginRequest;
use App\Models\Admin;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
  /**
   * Admin login endpoint
   *
   * @param AdminLoginRequest $request
   * @return JsonResponse
   */
  public function login(AdminLoginRequest $request): JsonResponse
  {
    $credentials = $request->only('email', 'password');

    if (!$token = Auth::guard('admin')->attempt($credentials)) {
      return response()->json([
        'success' => false,
        'message' => 'Invalid credentials'
      ], 401);
    }

    // Check if account is active
    if (!Admin::accountActive($request->email)) {
      return response()->json([
        'success' => false,
        'message' => 'Your account is inactive. Please contact administrator.'
      ], 401);
    }

    // Get admin details
    $admin = user('admin');

    // Only include specific fields
    $adminData = [
      'full_name' => $admin->full_name,
      'email' => $admin->email,
      'avatar' => $admin->avatar
    ];

    return response()->json([
      'success' => true,
      'message' => 'Login successful',
      'data' => [
        'user' => $adminData,
        'access_token' => $token,
        'token_type' => 'bearer',
        'expires_in' => auth('admin')->factory()->getTTL() * 60 // Token expiration in seconds
      ]
    ], 200);
  }

  /**
   * Logout admin user
   *
   * @return JsonResponse
   */
  public function logout(): JsonResponse
  {
    Auth::guard('admin')->logout();

    return response()->json([
      'success' => true,
      'message' => 'Successfully logged out'
    ]);
  }
}

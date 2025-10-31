<?php

namespace App\Http\Middleware;

use App\Helpers\ApiResponse;
use App\Models\User;
use Closure;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\Log;
use PHPOpenSourceSaver\JWTAuth\Exceptions\JWTException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenBlacklistedException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenExpiredException;
use PHPOpenSourceSaver\JWTAuth\Exceptions\TokenInvalidException;
use Symfony\Component\HttpFoundation\Response;
use PHPOpenSourceSaver\JWTAuth\Facades\JWTAuth;
use Vinkla\Hashids\Facades\Hashids;

class DecodeJwtToken
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    try {
      // Check if token exists
      if (!$token = JWTAuth::getToken()) {
        return ApiResponse::error('Token not provided', 401);
      }
      
      // Parse token and get payload
      $payload = JWTAuth::parseToken()->getPayload();
      
      // Validate device ID
      if (!$this->validateDevice($request, $payload)) {
        return ApiResponse::error('Unauthorized Device', 403);
      }
      
      // Get user from token
      $user = $this->getUserFromToken($payload);
      if (!$user) {
        return ApiResponse::error('User not found', 404);
      }
      
      // Set authenticated user
      Auth::setUser($user);
      
      return $next($request);
    } catch (TokenBlacklistedException $e) {
      return ApiResponse::error('Token has been blacklisted', 401);
    } catch (TokenExpiredException $e) {
      return ApiResponse::error('Token expired', 401);
    } catch (TokenInvalidException $e) {
      return ApiResponse::error('Invalid token', 401);
    } catch (JWTException $e) {
      return ApiResponse::error('Token parsing error', 401);
    } catch (Exception $e) {
      // Log the actual exception in development
      if (config('app.debug')) {
        Log::error('JWT Authentication error', [
          'error' => $e->getMessage(),
          'trace' => $e->getTraceAsString()
        ]);
        return ApiResponse::error('Authentication error: ' . $e->getMessage(), 401);
      }
      return ApiResponse::error('Unauthorized', 401);
    }
  }
  
  /**
   * Validate device ID from token against request header
   * 
   * @param Request $request
   * @param \PHPOpenSourceSaver\JWTAuth\Payload $payload
   * @return bool
   */
  protected function validateDevice(Request $request, $payload): bool
  {
    $tokenDeviceId = $payload->get('device_id');
    $incomingDeviceId = $request->header('X-Device-ID');
    
    return $incomingDeviceId && $incomingDeviceId === $tokenDeviceId;
  }
  
  /**
   * Get user from token payload
   * 
   * @param \PHPOpenSourceSaver\JWTAuth\Payload $payload
   * @return User|null
   */
  protected function getUserFromToken($payload)
  {
    $userId = Hashids::decode($payload->get('sub'))[0] ?? null;
    if (!$userId) {
      return null;
    }
    
    // Cache user lookup to prevent repeated database queries
    $cacheKey = 'jwt_user_' . $userId;
    return Cache::remember($cacheKey, now()->addMinutes(10), function () use ($userId) {
      return User::find($userId);
    });
  }
}

<?php

namespace App\Http\Middleware;

use App\Helpers\ApiResponse;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Symfony\Component\HttpFoundation\Response;
use Vinkla\Hashids\Facades\Hashids;

class DecodeHashid
{
  /**
   * Handle an incoming request.
   *
   * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
   */
  public function handle(Request $request, Closure $next): Response
  {
    $hashid = $request->route('id'); // 'id' is supplied via route
    
    // Validate hashid format before attempting decode
    if (!$hashid || !preg_match('/^[A-Za-z0-9]+$/', $hashid)) {
      return ApiResponse::error('Invalid ID format', 400);
    }
    
    $decoded = Hashids::decode($hashid);
    
    if (empty($decoded)) {
      // Log failed decode attempts for security monitoring
      if (config('app.debug')) {
        Log::warning('Failed to decode hashid', ['hashid' => $hashid, 'ip' => $request->ip()]);
      }
      return ApiResponse::error('Resource not found', 404);
    }
    
    // Only process string inputs that need trimming
    $this->trimStringInputs($request);
    
    // Replacing hashid with the decoded integer
    $request->route()->setParameter('id', $decoded[0]);

    return $next($request);
  }

  /**
   * Trim string inputs in the request
   * 
   * @param Request $request
   * @return void
   */
  protected function trimStringInputs(Request $request): void
  {
    $inputs = $request->all();
    foreach ($inputs as $key => $value) {
      if (is_string($value)) {
        $request->merge([$key => trim($value)]);
      }
    }
  }
}

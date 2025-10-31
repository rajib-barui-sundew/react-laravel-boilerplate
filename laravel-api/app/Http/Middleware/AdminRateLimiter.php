<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Cache\RateLimiter;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;

class AdminRateLimiter
{
  /**
   * The rate limiter instance.
   *
   * @var \Illuminate\Cache\RateLimiter
   */
  protected $limiter;

  /**
   * Create a new rate limiter middleware.
   *
   * @param  \Illuminate\Cache\RateLimiter  $limiter
   * @return void
   */
  public function __construct(RateLimiter $limiter)
  {
    $this->limiter = $limiter;
  }

  /**
   * Handle an incoming request.
   *
   * @param  \Illuminate\Http\Request  $request
   * @param  \Closure  $next
   * @param  int  $maxAttempts
   * @param  int  $decayMinutes
   * @return \Symfony\Component\HttpFoundation\Response
   */
  public function handle(Request $request, Closure $next, $maxAttempts = 60, $decayMinutes = 1): Response
  {
    $key = $this->resolveRequestSignature($request);

    if ($this->limiter->tooManyAttempts($key, $maxAttempts)) {
      return response()->json([
        'success' => false,
        'message' => 'Too many attempts. Please try again later.',
      ], 429);
    }

    $this->limiter->hit($key, $decayMinutes * 60);

    $response = $next($request);

    return $this->addHeaders(
      $response,
      $maxAttempts,
      $this->calculateRemainingAttempts($key, $maxAttempts)
    );
  }

  /**
   * Resolve request signature.
   *
   * @param  \Illuminate\Http\Request  $request
   * @return string
   */
  protected function resolveRequestSignature($request): string
  {
    return Str::lower($request->ip());
  }

  /**
   * Calculate the number of remaining attempts.
   *
   * @param  string  $key
   * @param  int  $maxAttempts
   * @return int
   */
  protected function calculateRemainingAttempts($key, $maxAttempts): int
  {
    return $this->limiter->retriesLeft($key, $maxAttempts);
  }

  /**
   * Add the limit header information to the given response.
   *
   * @param  \Symfony\Component\HttpFoundation\Response  $response
   * @param  int  $maxAttempts
   * @param  int  $remainingAttempts
   * @return \Symfony\Component\HttpFoundation\Response
   */
  protected function addHeaders(Response $response, $maxAttempts, $remainingAttempts): Response
  {
    $response->headers->add([
      'X-RateLimit-Limit' => $maxAttempts,
      'X-RateLimit-Remaining' => $remainingAttempts,
    ]);

    return $response;
  }
}

<?php

use Carbon\Carbon;
use Illuminate\Support\Facades\Log;

/**
 * Format a date/time using flexible input parsing and configurable output.
 */
if (!function_exists('formatDate')) {
  function formatDate(?string $date, ?string $format = null): ?string
  {
    if (blank($date)) return null;

    $format ??= config('defaults.date_format', 'Y-m-d H:i:s');
    $inputFormats = ['Y-m-d H:i:s', 'Y-m-d H:i', 'Y-m-d', 'd/m/Y H:i:s', 'd/m/Y H:i', 'd/m/Y'];

    try {
      foreach ($inputFormats as $fmt) {
        $parsed = Carbon::createFromFormat($fmt, trim($date));
        if ($parsed && $parsed->format($fmt) === trim($date)) {
          return $parsed->format($format);
        }
      }
      // fallback to auto-parse
      return Carbon::parse($date)->format($format);
    } catch (\Throwable $e) {
      Log::error('Date parse failed', ['date' => $date, 'error' => $e->getMessage()]);
      return null;
    }
  }
}

/**
 * Quick helpers for common display formats.
 */
if (!function_exists('convertDate')) {
  function convertDate(?string $date = null): ?string
  {
    return formatDate($date, config('defaults.date_format', 'Y-m-d'));
  }
}

if (!function_exists('convertDateTime')) {
  function convertDateTime(?string $date = null): ?string
  {
    $time = str_replace('H', 'h', config('defaults.time_format', 'H:i:s')) . ' A';
    return formatDate($date, config('defaults.date_format', 'Y-m-d') . " $time");
  }
}

if (!function_exists('convertDateTimeHours')) {
  function convertDateTimeHours(?string $date = null): ?string
  {
    return formatDate(
      $date,
      config('defaults.date_format', 'Y-m-d') . ' ' . config('defaults.time_format', 'H:i:s')
    );
  }
}

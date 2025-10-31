<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Str;
use Jenssegers\Agent\Agent;
use App\Models\Admin;
use App\Models\AdminRole;
use App\Models\RolePermission;
use App\Models\SiteSetting;
use App\Models\User;

if (!function_exists('user')) {
  function user($guard = null)
  {
    if (!Schema::hasTable('admins')) return null;
    $auth = auth()->guard($guard)->user();
    if ($auth && $guard === 'admin') {
      $role = AdminRole::getRole($auth->id);
      $auth->role_id = $role->id ?? null;
      $auth->role_name = $role->name ?? null;
    }
    return $auth;
  }
}

if (!function_exists('hasUserPermission')) {
  function hasUserPermission($route)
  {
    $user = user('admin');
    if (!$user) return false;
    $roleId = AdminRole::getRole($user->id)->id ?? null;
    return $roleId == 1 || RolePermission::hasPermission($roleId, $route);
  }
}

if (!function_exists('truncateNoWordBreak')) {
  function truncateNoWordBreak($text, $limit = 250, $end = '...')
  {
    if (Str::length($text) <= $limit) return $text;
    $truncated = Str::limit($text, $limit, '');
    return preg_replace('/\s+?(\S+)?$/', '', $truncated) . $end;
  }
}

if (!function_exists('getUserAgentInfo')) {
  function getUserAgentInfo(): array
  {
    $agent = new Agent();
    $ip = request()->header('X-Forwarded-For') ?: request()->ip();
    return [
      'browser'  => $agent->browser(),
      'version'  => $agent->version($agent->browser()),
      'os'       => $agent->platform(),
      'device'   => $agent->device(),
      'ip'       => $ip,
    ];
  }
}

if (!function_exists('siteLogo')) {
  function siteLogo()
  {
    if (!Schema::hasTable('site_settings')) return null;
    $logo = SiteSetting::where('key', 'site_logo')->value('value');
    return $logo ? url("storage/uploads/site/logo/$logo") : asset('images/logo-dark.png');
  }
}

if (!function_exists('pd')) {
  function pd(...$data)
  {
    echo "<body style='background:#222;color:#56DB3A;font-family:monospace'>";
    foreach ($data as $d) {
      echo "<pre style='padding:10px;border:1px solid #444'>";
      print_r(json_decode(json_encode($d), true));
      echo "</pre>";
    }
    die('</body>');
  }
}

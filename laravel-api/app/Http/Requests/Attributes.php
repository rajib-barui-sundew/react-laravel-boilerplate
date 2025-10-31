<?php

namespace App\Http\Requests;

class Attributes
{
  /**
   * Global reusable attribute names.
   */
  protected static array $map = [
    'email' => 'Email',
    'password' => 'Password',
    'name' => 'Name',
    'full_name' => 'Name',
    'mobile' => 'Mobile Number',
    'phone' => 'Phone Number',
    'address' => 'Address',
    'city' => 'City',
    'state' => 'State',
    'country' => 'Country',
    'user_id' => 'User ID',
    'username' => 'Username',
  ];

  /**
   * Get all global attributes.
   */
  public static function all(): array
  {
    return self::$map;
  }

  /**
   * Get label for a given attribute key.
   */
  public static function get(string $key): string
  {
    return self::$map[$key] ?? ucfirst(str_replace('_', ' ', $key));
  }
}

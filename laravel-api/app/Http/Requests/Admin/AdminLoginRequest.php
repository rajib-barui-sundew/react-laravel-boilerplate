<?php

namespace App\Http\Requests\Admin;

use App\Http\Requests\BaseRequest;

class AdminLoginRequest extends BaseRequest
{
  protected function baseRules(): array
  {
    return [
      'email' => 'required|email',
      'password' => 'required|string|min:8',
    ];
  }
}

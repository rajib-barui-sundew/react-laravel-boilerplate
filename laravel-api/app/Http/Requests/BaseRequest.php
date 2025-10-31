<?php

namespace App\Http\Requests;

use Illuminate\Contracts\Validation\Validator;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Http\Exceptions\HttpResponseException;

abstract class BaseRequest extends FormRequest
{
  /**
   * Authorize all requests by default.
   */
  public function authorize(): bool
  {
    return true;
  }

  /**
   * Customize validation failure response.
   */
  protected function failedValidation(Validator $validator)
  {
    $errors = $validator->errors()->all();

    throw new HttpResponseException(
      response()->json([
        'success' => false,
        'data' => [],
        'message' => $errors[0], // first error only
      ], 422)
    );
  }

  /**
   * Automatically apply `bail` to all rules unless overridden.
   */
  public function rules(): array
  {
    $rules = $this->baseRules();

    return collect($rules)->map(function ($ruleSet) {
      $ruleSet = is_array($ruleSet) ? $ruleSet : explode('|', $ruleSet);

      if (!in_array('bail', $ruleSet, true)) {
        array_unshift($ruleSet, 'bail');
      }

      return $ruleSet;
    })->toArray();
  }

  /**
   * To be defined in each child class.
   */
  abstract protected function baseRules(): array;

  /**
   * Merge global + local attributes.
   */
  public function attributes(): array
  {
    $global = Attributes::all();
    $local = property_exists($this, 'localAttributes') ? $this->localAttributes : [];

    return array_merge($global, $local);
  }
}

<?php

namespace App\Models;

use Vinkla\Hashids\Facades\Hashids;
use Illuminate\Contracts\Auth\Authenticatable  as AuthenticatableContract;
use Illuminate\Auth\Authenticatable;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Str;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class Admin extends Model implements AuthenticatableContract, JWTSubject
{
  use Authenticatable, SoftDeletes, Notifiable;

  /**
   * Get the identifier that will be stored in the subject claim of the JWT.
   *
   * @return mixed
   */
  public function getJWTIdentifier()
  {
    return Hashids::encode($this->id);
  }

  /**
   * Return a key value array, containing any custom claims to be added to the JWT.
   *
   * @return array
   */
  public function getJWTCustomClaims()
  {
    return [
      'email' => $this->email
    ];
  }

  protected $fillable = [
    'first_name',
    'middle_name',
    'last_name',
    'email',
    'password',
    'phone',
    'status',
    'created_by',
    'updated_by'
  ];

  public function roles()
  {
    return $this->belongsToMany(Roles::class, 'admin_role', 'admin_id', 'role_id');
  }

  // public function department()
  // {
  //   return $this->belongsToMany(Department::class, 'admin_departments', 'admin_id', 'department_id');
  // }

  public static function getAdminIDByEmail(string $email): int
  {
    $user = self::where('email', $email)->first();
    if ($user)
      return $user->id;
    return 0;
  }

  public function adminActivity()
  {
    return $this->hasMany(AdminActivity::class, 'user_id');
  }

  public static function accountActive(string $email): bool
  {
    return self::where('email', $email)->value('status') == 1;
  }

  public static function changePassword(int $id, string $password): JsonResponse
  {
    $user = self::find($id);

    if ($user) {
      if (password_verify($password, $user->password))
        return response()->json(['success' => false, 'message' => __('response.auth.password.same_current_password')]);

      $user->password = bcrypt($password);
      $user->save();
      Verification::deleteToken($id, 'admin');
      session()->flush();
      return response()->json(['success' => true, 'message' => __('response.success.update', ['item' => 'Password'])]);
    }
    return response()->json(['success' => false, 'message' => __('response.error.update', ['item' => 'Password'])]);
  }

  public static function updatePassword(int $id = 0, string $currentPassword = '', string $password = ''): JsonResponse
  {
    $user = self::find($id);

    if (password_verify($currentPassword, $user->password)) {
      $user->password = bcrypt($password);
      $user->save();
      return response()->json(['success' => true, 'message' => __('response.success.update', ['item' => 'Password'])]);
    }
    return response()->json(['success' => false, 'message' => __('response.error.incorrect', ['item' => 'Current Password'])]);
  }

  public static function updateProfilePicture(string $imageName = '', int $id = 0): bool
  {
    $user = self::find($id);
    if ($user) {
      $user->avatar = $imageName;
      $user->save();
      return true;
    }
    return false;
  }

  public static function store($request, int $id = 0, string $password = '')
  {
    $admin = $id ? self::find($id) : new self();

    if (!$admin) {
      return response()->json(['success' => false, 'message' => __('response.error.' . ($id ? 'update' : 'create'), ['item' => 'User'])]);
    }

    $admin->fill([
      'first_name'  => $request->firstname,
      'middle_name' => $request->middlename,
      'last_name'   => $request->lastname,
      'email'       => $request->adminemail,
      'phone'       => $request->adminphone,
      'status'      => $request->status,
      'updated_by'  => user('admin')->id,
    ]);

    if (!$id) {
      $admin->password = bcrypt($password);
      $admin->created_by = user('admin')->id;
    }

    if (!$admin->save()) { // If saving fails
      return response()->json(['success' => false, 'message' => __('response.error' . ($id ? 'update' : 'create'), ['item' => 'User'])]);
    }

    $decodedRoles = array_filter(array_map(fn($encoded) => Hashids::decode($encoded)[0] ?? null, $request->adminrole));

    if (!empty($decodedRoles)) {
      $admin->roles()->sync($decodedRoles);
    }

    if ($request->department) {
      $decodedDepartment = Hashids::decode($request->department)[0] ?? null;

      if ($decodedDepartment) {
        $admin->department()->sync($decodedDepartment);
        $admin->department()->updateExistingPivot($decodedDepartment, [
          'created_by' => user('admin')->id,
          'updated_by' => user('admin')->id
        ]);
      }
    }

    return response()->json(['success' => true, 'message' => __('response.success.' . ($id ? 'update' : 'create'), ['item' => 'User'])]);
  }

  public static function toggleStatus(int $id = 0): JsonResponse
  {
    $user = self::find($id);
    if ($user) {
      $user->status = !$user->status;
      $user->save();

      return response()->json(['success' => true, 'message' => __('response.success.update', ['item' => 'Status']), 'newStatus' => $user->status]);
    }
    return response()->json(['success' => false, 'message' => __('response.not_found', ['item' => 'Status'])]);
  }

  public static function remove(int $id = 0): JsonResponse
  {
    $user = self::find($id);

    if ($user) {
      if ($user->id == user('admin')->id)
        return response()->json(['success' => false, 'message' => __('response.error.delete', ['item' => 'Own account'])]);
      else if ($user->id === 1)
        return response()->json(['success' => false, 'message' => __('response.error.delete', ['item' => 'This Super Admin account'])]);
      else if (user('admin')->role_id >= AdminRole::getRole($id)->id)
        return response()->json(['success' => false, 'message' => __('response.error.not_allowed', ['item' => 'Same or Superior Role Deletion'])]);

      $user->delete();
      return response()->json(['success' => true, 'message' => __('response.success.delete', ['item' => 'Admin'])]);
    }
    return response()->json(['success' => false, 'message' => __('response.error.delete', ['item' => 'Admin'])]);
  }

  public static function resetPassword(int $id = 0): ?string
  {
    $newPassword = Str::random(8);
    $user = self::find($id);
    if ($user) {
      $user->password = bcrypt($newPassword);
      $user->save();

      return $newPassword;
    }
    return null;
  }

  public static function scopeSearch($query, $search)
  {
    if (!empty($search)) {
      $keywords = explode(' ', $search);

      return $query->where(function ($q) use ($keywords) {
        foreach ($keywords as $word) {
          $q->where(function ($subQuery) use ($word) {
            $subQuery->where('full_name', 'like', '%' . $word . '%')
              ->orWhere('email', 'like', '%' . $word . '%')
              ->orWhere('phone', 'like', '%' . $word . '%')
              ->orWhereHas('roles', function ($query) use ($word) {
                $query->where('name', 'like', '%' . $word . '%');
              });
          });
        }
      });
    }
  }
}

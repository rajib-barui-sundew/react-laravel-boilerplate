<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class AdminSeed extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    $defaultPassword = bcrypt('Sundew#123');
    $superAdmin = [
      [
        'full_name' => 'Rajib Barui',
        'email' => 'rajib.sundew@yopmail.com',
        'phone' => '1234567890',
        'password' => $defaultPassword,
        'status' => 1,
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'full_name' => 'Test admin',
        'email' => 'testadmin@yopmail.com',
        'phone' => '5297879462',
        'password' => $defaultPassword,
        'status' => 1,
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
      ],
    ];

    DB::table('admins')->insert($superAdmin);

    $role = [
      [
        'name' => 'Super Admin',
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'name' => 'Admin',
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
      ]
    ];

    DB::table('roles')->insert($role);

    $adminRoles = [
      [
        'admin_id' => 1,
        'role_id' => 1,
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
      ],
      [
        'admin_id' => 2,
        'role_id' => 2,
        'created_by' => 1,
        'updated_by' => 1,
        'created_at' => now(),
        'updated_at' => now(),
      ]
    ];

    DB::table('admin_role')->insert($adminRoles);
  }
}

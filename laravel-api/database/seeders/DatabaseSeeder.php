<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  /**
   * Seed the application's database.
   */
  public function run(): void
  {
    $this->call([
      AdminSeed::class,
      PermissionSeeder::class,
      CountrySeeder::class,
      StatesTableSeeder::class,
      SiteSettingsSeeder::class
    ]);
  }
}

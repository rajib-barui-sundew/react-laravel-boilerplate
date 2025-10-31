<?php

return [

  /*
    |--------------------------------------------------------------------------
    | Default Connection Name
    |--------------------------------------------------------------------------
    |
    | Here you may specify which of the connections below you wish to use as
    | your default connection for all work. Of course, you may use many
    | connections at once using the manager class.
    |
    */

  'default' => 'main',

  /*
    |--------------------------------------------------------------------------
    | Hashids Connections
    |--------------------------------------------------------------------------
    |
    | Here are each of the connections setup for your application. Example
    | configuration has been included, but you may add as many connections as
    | you would like.
    |
    */

  'connections' => [

    'main' => [
      'salt' => 'RajibBarui123',
      'length' => 12,
      'alphabet' => 'VZ1ybAqgSw3oL0XhdcDjkfIltzHKnYim7eGsRUB9Nv8QaCWJrFxu5E4MpPT62O'
    ],

    'alternative' => [
      'salt' => 'your-salt-string',
      'length' => 'your-length-integer',
      // 'alphabet' => 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    ],

  ],

];

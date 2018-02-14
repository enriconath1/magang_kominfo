<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('getTotalAttack','ApiController@getTotalAttack');

Route::get('getTotalCountry','ApiController@getTotalCountry');

Route::get('getTotalMalwareAttack','ApiController@getTotalMalware');

Route::get('getUniqueAttack','ApiController@getUniqueAttack');

Route::get('countryList','ApiController@countryList');

Route::get('topCountry','ApiController@topCountry');

Route::get('topFiveCountry','ApiController@topFiveCountry');

Route::get('topFivePort','ApiController@topFivePort');

Route::get('topFiveMalware','ApiController@topFiveMalware');

Route::get('instituteCount','ApiController@instituteCount');

Route::get('sensorList','SensorController@sensorList');

Route::get('getIPSensor/{sensorId}','SensorController@ipAttackedList');

Route::get('getPortSensor/{sensorId}','SensorController@PortAttackedList');

Route::get('getMalwareSensor/{sensorIP}', 'SensorController@malwareAttackedList');

Route::get('getPICSensor/{sensorID}', 'SensorController@picSensorDetail');
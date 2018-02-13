<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('pages.login');
});

Route::get('/welcome', function () {
    return view('welcome');
});

Route::get('/dashboard',function(){
	return view('pages.dashboard');
});

Route::resource('api','ApiController');
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
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

Route::get('/iplist',function(){
	return view('pages.ipList');
});

// API CONTROLLER

Route::resource('api','ApiController');

Route::resource('iplist','ApiController');

Route::get('getTotalAttack','ApiController@getTotalAttack');

Route::get('getTotalCountry','ApiController@getTotalCountry');

Route::get('getTotalMalwareAttack','ApiController@getTotalMalware');

Route::get('getUniqueAttack','ApiController@getUniqueAttack');

Route::get('getCountry','ApiController@countryList');

Route::get('topCountry','ApiController@topCountry');

Route::get('topFiveCountry','ApiController@topFiveCountry');

Route::get('topFivePort','ApiController@topFivePort');

Route::get('topFiveMalware','ApiController@topFiveMalware');

Route::get('attackerList','ApiController@attackerList');

Route::get('loadWorldMap', 'ApiController@loadWorldMap');

Route::get('loadIndonesiaMap', 'ApiController@loadIndonesiaMap');

Route::get('portAttackList/{ipaddress}', 'ApiController@portAttackList');

Route::get('getMalwareAttack/{ipaddress}/{detailOffset}/{detailLimit}', 'ApiController@malwareAttackIpList');

Route::get('searchIP/{ipAddress}/{offset}/{limit}', 'ApiController@searchIP');

Route::get('ipDetail/{ipaddress}', 'ApiController@grabberIP');


//INSTITUTIONCONTROLLER

Route::get('instituteCount','InstitutionController@instituteCount');

Route::post('storeInstitute', 'InstitutionController@storeInstitute');


//SENSORCONTROLLER

Route::get('sensorList','SensorController@sensorList');

Route::get('sensorType','SensorController@sensorType');

Route::get('getIPSensor/{sensorId}','SensorController@ipAttackedList');

Route::get('getPortSensor/{sensorId}','SensorController@PortAttackedList');

Route::get('getMalwareSensor/{sensorIP}', 'SensorController@malwareAttackedList');

Route::get('getPICSensor/{sensorID}', 'SensorController@picSensorDetail');

//USERCONTROLLER

Route::get('userList','UserController@userList');

Route::post('storeUser', 'UserController@storeUser');




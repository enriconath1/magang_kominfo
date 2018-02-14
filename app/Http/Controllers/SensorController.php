<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class SensorController extends Controller
{


	function __construct()
    {
		$this->apiKey = config('app.api-key') ;
	    $this->host = config('app.api-url') ;
    }


    public function sensorList()

	{
        $sensor = $this->host . 'sensors/sensorCount/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$sensor);
        $sensorlist = $res->getBody();
        $sensorlist = json_decode($sensorlist);
        return response()->json(['total' => $sensorlist] , 200);
	}


    public function sensorType()

    {
        $sensor = $this->host . 'sensors/sensorType/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$sensor);
        $sensorlist = $res->getBody();
        $sensorlist = json_decode($sensorlist);
        return response()->json(['total' => $sensorlist] , 200);
    }

	public function ipAttackedList($sensorID)

	{
        $ipAttacked = $this->host . "sensors/attackerBySensor/" . $sensorID . "/" . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$ipAttacked);
        $ipList = $res->getBody();
        $ipList = json_decode($ipList);
        return response()->json(['total' => $ipList] , 200);
	}


	public function PortAttackedList($sensorID)

	{
        $portAttacked = $this->host . "sensors/portBySensor/" . $sensorID . "/" . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$portAttacked);
        $portList = $res->getBody();
        $portList = json_decode($portList);
        return response()->json(['total' => $portList] , 200);
	}

	public function malwareAttackedList($sensorID)

	{
        $malwareAttacked = $this->host . "sensors/malwareBySensor/" . $sensorID . "/" . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$malwareAttacked);
        $malwareList = $res->getBody();
        $malwareList = json_decode($malwareList);
        return response()->json(['total' => $malwareList] , 200);
	}


	public function picSensorDetail($sensorID)

	{
        $picSensor = $this->host . "sensors/malwareBySensor/" . $sensorID . "/" . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$picSensor);
        $picDetail = $res->getBody();
        $picDetail = json_decode($picDetail);
        return response()->json(['total' => $picDetail] , 200);
	}


    public function addSensorInstance($sensorName, $sensorIP, $user1Id, $user2Id, $sensorType){
        $url = $this->host . "users/addSensor/" . Session::get('sessionKey') . "/" . $this->apiKey;
        $client = new \GuzzleHttp\Client;
        $client->setDefaultOption('verify', false);
        
        $req = $client->createRequest('POST', $url);
        $req->setHeader('Content-Type', 'application/x-www-form-urlencoded');

        $postBody = $req->getBody();
        $postBody->setField('sensor_name', $sensorName);
        $postBody->setField('sensor_ip', $sensorIP);
        $postBody->setField('user_1_id', $user1Id);
        $postBody->setField('user_2_id', $user2Id);
        $postBody->setField('sensor_type', $sensorType);
        
        try {
            $resp = $client->send($req);
                if ($resp) {
                    Session::flash('success', 'Successfully added new sensor!');
                    return Redirect::to('sensorList');
                }
        }
        
        catch (\GuzzleHttp\Exception\ClientException $e){
            // if($e->getResponse()->getStatusCode() == 400){
                // Session::flash('failure', 'Wrong Username or Password');
            // }
            // return Redirect::to('login');
        }
    }
    

}

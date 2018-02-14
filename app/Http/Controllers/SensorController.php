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

}

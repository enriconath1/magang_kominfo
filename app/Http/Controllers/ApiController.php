<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
class ApiController extends Controller
{
    
    function __construct()
    {
		$this->apiKey = config('app.api-key') ;
	    $this->host = config('app.api-url') ;
    }


    // public function index(request $request){


    // 	return view('pages.dashboard',compact('totalAttackResp'));
    // }


    public function getTotalAttack()

	{
        $totalAttack = $this->host . 'attackerList/totalAttack/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$totalAttack);
        $totalAttackResp = $res->getBody();
        $totalAttackResp = json_decode($totalAttackResp);
        return response()->json(['total' => $totalAttackResp] , 200);
	}

	public function getTotalCountry()

	{
        $totalCountry = $this->host . 'attackerList/totalCountry/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$totalCountry);
        $getTotal = $res->getBody();
        $getTotal = json_decode($getTotal);
        return response()->json(['total' => $getTotal] , 200);
	}

	public function getTotalMalware()

	{
        $totalMalware = $this->host . '/malwares/totalMalwareAttack/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$totalMalware);
        $getTotal = $res->getBody();
        $getTotal = json_decode($getTotal);
        return response()->json(['total' => $getTotal] , 200);
	}


	public function getUniqueAttack()

	{
        $uniqueAttacker = $this->host . '/attackerList/uniqueAttacker/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$uniqueAttacker);
        $uniqueattack = $res->getBody();
        $uniqueattack = json_decode($uniqueattack);
        return response()->json(['total' => $uniqueattack] , 200);
	}


	public function countryList()

	{
        $countryList = $this->host . '/attackerList/distinctCountry/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$countryList);
        $listcountry = $res->getBody();
        $listcountry = json_decode($listcountry);
        return response()->json(['total' => $listcountry] , 200);
	}
	

	public function topCountry()

	{
        $topCountry = $this->host . 'connections/countryCounts/0/10/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$topCountry);
        $topCountryResp = $res->getBody();
        $topCountryResp = json_decode($topCountryResp);
        return response()->json(['total' => $topCountryResp] , 200);
	}

	public function topFiveCountry()

	{
        $topfiveCountry = $this->host . 'connections/countryCounts/0/5/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$topfiveCountry);
        $topCountryResp = $res->getBody();
        $topCountryResp = json_decode($topCountryResp);
        return response()->json(['total' => $topCountryResp] , 200);
	}

	public function topFivePort()

	{
        $fivePort = $this->host . 'connections/portCounts/0/5/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$fivePort);
        $fivePortResp = $res->getBody();
        $fivePortResp = json_decode($fivePortResp);
        return response()->json(['total' => $fivePortResp] , 200);
	}


	public function topFiveMalware()

	{
        $topMalware = $this->host . 'malwares/malwareStats/AhnLab-V3/0/5/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$topMalware);
        $malwareResp = $res->getBody();
        $malwareResp = json_decode($malwareResp);
        return response()->json(['total' => $malwareResp] , 200);
	}

	public function instituteCount()

	{
        $institute = $this->host . '/institutes/instituteCount/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$institute);
        $instituteResp = $res->getBody();
        $instituteResp = json_decode($instituteResp);
        return response()->json(['total' => $instituteResp] , 200);
	}


    public function loadWorldMap()

    {
        $WorldStat = $this->host . "connections/countryCounts/" . 0 . "/" . 250 . "/" . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$WorldStat);
        $WorldStatResp = $res->getBody();
        $WorldStatResp = json_decode($WorldStatResp);
        return response()->json(['total' => $WorldStatResp] , 200);
    }


    public function loadIndonesiaMap()

    {
        $provinceStat = $this->host . 'province/getProvinceAttackerStats/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$provinceStat);
        $provinceStatResp = $res->getBody();
        $provinceStatResp = json_decode($provinceStatResp);
        return response()->json(['total' => $provinceStatResp] , 200);
    }

	
	public function attackerList()

    {
        $attacker = $this->host . "/attackerList/attackerIpCount/" . 0 . "/" . 250 . "/" . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$attacker);
        $uniqueattack = $res->getBody();
        $uniqueattack = json_decode($uniqueattack);
        return response()->json(['total' => $uniqueattack] , 200);
    }


}

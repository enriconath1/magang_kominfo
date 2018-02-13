<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ConnectionController extends Controller
{
    

	public function addUserInstance($userName,$userTelp,$encodedEmail,$encodedPassword,$instituteId,$roleId){
		$url = $this->host . "users/add/" . Session::get('sessionKey') . "/" . $this->apiKey;
		$client = new \GuzzleHttp\Client;
		$client->setDefaultOption('verify', false);
		
		$req = $client->createRequest('POST', $url);
		$req->setHeader('Content-Type', 'application/x-www-form-urlencoded');

		$postBody = $req->getBody();
		$postBody->setField('name', $userName);
		$postBody->setField('telp', $userTelp);
		$postBody->setField('encodedEmail', $encodedEmail);
		$postBody->setField('encodedPassword', $encodedPassword);
		$postBody->setField('instituteId', $instituteId);
		$postBody->setField('roleId', $roleId);
		
		
		try {
			$resp = $client->send($req);
			if($resp){
				$user1Data = $this->host . 'users/byEmail/' . $encodedEmail . '/' . Session::get('sessionKey') . "/"  . $this->apiKey;
				$user1Resp = Httpful::get($user1Data)->send();
				$user1 = $user1Resp->body;
				return $user1;
			}
		}
		
		catch (\GuzzleHttp\Exception\ClientException $e){
			echo($e);
		}
	}



	public function totalAttackTest($userId){
      if(Session::get('role_level') == 4){
        $baseurlTotalAttack = $this->host . '/attackerList/totalAttack/' . $userId . '/' . $this->apiKey;
        $totalAttackResp = Httpful::get($baseurlTotalAttack)->send();
        $totalAttack = $totalAttackResp->body;
      }
      else {
        $baseurlTotalAttack = $this->host . '/attackerList/totalAttack/' . $this->apiKey;
        $totalAttackResp = Httpful::get($baseurlTotalAttack)->send();
        $totalAttack = $totalAttackResp->body;
      }
      foreach($totalAttack as $atk){
        echo $atk->count;
      }
    }


}

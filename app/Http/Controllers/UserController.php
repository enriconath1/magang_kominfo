<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class UserController extends Controller
{
    function __construct()
    {
		$this->apiKey = config('app.api-key') ;
	    $this->host = config('app.api-url') ;
    }

    public function userList()

	{
        $userList = $this->host . 'users/list/' . 10 . '/' . 10 . '/' . Session::get('sessionKey') . '/' . $this->apiKey;
        $client = new \GuzzleHttp\Client();
        $res = $client->request('GET',$userList);
        $userListResp = $res->getBody();
        $userListResp = json_decode($userListResp);
        return response()->json(['total' => $userListResp] , 200);
	}


	public function storeUser() {
        $rules = array(
            'name' => 'required',
            'telp' => 'required|numeric',
            'email' => 'required|email',
            'password' => 'required|min:6',
            'confirmPassword' => 'required|same:password|min:6'
        );
        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            return Redirect::back()
                            ->withErrors($validator);
        } else {
			$encodedEmail = base64_encode(Input::get('email'));
			$encodedPassword = base64_encode(Input::get('pass'));

			$url = $this->host . "users/add/" . Session::get('sessionKey') . "/" . $this->apiKey;
			$client = new \GuzzleHttp\Client;
			$client->setDefaultOption('verify', false);

			$req = $client->createRequest('POST', $url);
			$req->setHeader('Content-Type', 'application/x-www-form-urlencoded');

			$postBody = $req->getBody();
			$postBody->setField('name', Input::get('name'));
			$postBody->setField('telp', Input::get('telp'));
			$postBody->setField('encodedEmail', $encodedEmail);
			$postBody->setField('encodedPassword', $encodedPassword);
			$postBody->setField('instituteId', Input::get('institute'));
			$postBody->setField('roleId', Input::get('role'));


			try {
				$resp = $client->send($req);
				if($resp){
					Session::flash('success', 'Successfully created User!');
					return Redirect::to('userList');
				}
			}

			catch (\GuzzleHttp\Exception\ClientException $e){
				echo($e);
			}

            // $user = new User();
            // $user->user_name = Input::get('name');
            // $user->user_telp = Input::get('telp');
            // $user->user_email = Input::get('email');
            // $user->user_pass = Hash::make(Input::get('pass'));
            // $user->institute_id = Input::get('institute');
            // $user->role_id = Input::get('role');
            // $user->user_last_activity = new \DateTime;
            // $user->user_last_update = new \DateTime;
            // $user->user_creation_time = new \DateTime;
            // $user->timestamps = false;
            // $user->save();

            // Session::flash('success', 'Successfully created User!');
            // return Redirect::to('userList');
        }
    }

}

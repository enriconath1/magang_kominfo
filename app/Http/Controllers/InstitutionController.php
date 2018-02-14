<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class InstitutionController extends Controller
{

	function __construct()
    {
		$this->apiKey = config('app.api-key') ;
	    $this->host = config('app.api-url') ;
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


	public function storeInstitute() {
        $rules = array(
            'name' => 'required',
            'address' => 'required',
            'category' => 'required',
            'province' => 'required',
        );
        $validator = Validator::make(Input::all(), $rules);

        if ($validator->fails()) {
            return Redirect::back()
                            ->withErrors($validator);
        } else {
            $institute = new Institute();
            $institute->institute_name = Input::get('name');
            $institute->institute_address = Input::get('address');
            $institute->category_id = Input::get('category');
            $institute->institute_province = Input::get('province');
            $institute->timestamps = false;
            $institute->save();

            Session::flash('success', 'Successfully created Institution!');
            return Redirect::to('institutionList');
        }
    }
	
}

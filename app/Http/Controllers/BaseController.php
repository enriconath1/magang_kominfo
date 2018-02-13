<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class BaseController extends Controller
{
    
    
    
    public function __construct() {
        $this->apiKey = Config::get('app.apiKey');
        $this->host = Config::get('app.webservice_host');
            
        $client = new \GuzzleHttp\Client;
        $client->setDefaultOption('verify', false);
    }
}

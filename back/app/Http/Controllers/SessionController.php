<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

use App\Http\Requests;

class SessionController extends Controller
{
  public function login(Request $request){

    return response()->json([
      'status' => 'ok',
      'customer' => [
        'email' => $request->get('email'),
        'type' => ($request->get('email') == "customer@customer.com" ? 'customer' : 'organization')
      ]
    ], 201);
  }

  public function logout(){
    return response()->json(['status' => 'ok'], 200);
  }
}

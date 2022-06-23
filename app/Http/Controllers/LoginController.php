<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class LoginController extends Controller {

    public function login() {
        if(session('username') != null) {
            return redirect("home");
        }
        else {
            $error = session('error');
            Session::forget('error');
            return view('login')->with('error',$error)->with('csrf_token', csrf_token());
        }
    }

    public function checkLogin() {
        $request = request();
        $user = User::where('username', $request['username'])->first();
        if(($user != null)&&(($user->username == request('username'))&& (password_verify(request('password'),$user->pwd)))) {
            Session::put('username', $user->username);
            return redirect('home');
        }
        else {
            Session::put('error', 'Credenziali errate');
            return redirect('login')->withInput();
        }
    }

    public function logout() {
        Session::flush();
        return redirect('login');
    }
}
?>
<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Session;

class SignupController extends Controller {

    public function index() {
        if(session('username') != null) {
            return redirect("home");
        }
        return view('signup');
    } 


    protected function create(){
        if(session('username') != null){
            return redirect("home");
        }
        $request = request();
        if($this->countErrors($request) === 0){
            $newUser = new User;
            $newUser->username =  $request['username'];
            $newUser->pwd =  password_hash($request['password'],PASSWORD_BCRYPT);
            $newUser->name =  $request['name'];
            $newUser->surname =  $request['surname'];
            $newUser->email = strtolower($request['email']);
            $newUser->save();

            if($newUser){
                Session::put('username', $request['username']);
                return redirect('home');
            } 
            else {
                return redirect('signup')->withInput();
            }
        }
        else 
            return redirect('signup')->withInput();
        
    }


    private function countErrors($data) {
        $error = array();


        if(strlen($data['name']==0)||strlen($data['surname']==0)||strlen($data['email']==0)||strlen($data['username']==0)
            ||strlen($data['password']==0)||strlen($data['confirm_password']==0)){
            $error[]="Devi compilare tutti i campi";
        }

        if(!preg_match('/^[a-zA-Z ]*$/', $data['name'])){ 
            $error[]="Devi inserire un nome reale";
        }

        if(!preg_match('/^[a-zA-Z ]*$/', $data['surname'])){ 
            $error[]="Devi inserire un cognome reale";
        }
    
        if(!preg_match('/^[a-zA-Z0-9_]{1,15}$/', $data['username'])) {
            $error[] = "Username non valido";
        } else {
            $username = User::where('username', $data['username'])->first();
            if ($username != null) {
                $error[] = "Username già in uso";
            }
        }

        if (strlen($data["password"]) < 8) {
            $error[] = "La password deve contenere almeno 8 caratteri";
        } 

        if (strcmp($data["password"], $data["confirm_password"]) != 0) {
            $error[] = "Le password non coincidono";
        }

        if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
            $error[] = "Email non valida";
        } else {
            $email = User::where('email', $data['email'])->first();
            if ($email != null) {
                $error[] = "Esiste un account associato a questa email";
            }
        }

        return count($error);
    }



    public function checkUsername($username) {
        if(session('username') != null) {
            return redirect("home");
        }

        $exist = User::where('username', $username)->exists();
        return array('exists'=> $exist);
    }

    public function checkEmail($email) {
        if(session('username') != null) {
            return redirect("home");
        }

        $exist = User::where('email', $email)->exists();
        return  array('exists'=> $exist);
    }



}
?>
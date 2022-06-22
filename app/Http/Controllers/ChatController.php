<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Chat;
use Illuminate\Http\Request;

class ChatController extends Controller {

    public function index() {
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');
        
        return view("chat")->with("user", $user);
    }



    function addMsg(){
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');

        $request = request();

        $query =new Chat;
        $query->username = $session;
        $query->movie_id = $request -> movie_id;
        $query->img = $request->img;
        $query->text_msg = $request->text;
        $query->title = $request->title;
        $query->updated = 0;
        $query->save();
        
        if($query){
            $response = array("op" => true); 
        }
        else{
            $response = array("op" => false); 
        }
    
        return $response;

    

    }



    function showMsg($type=null,$id=null){
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');

        $status=false;

        if(($type==null)||($id==null)){
            $results = Chat::orderByDesc('msg_id')->limit(10)->get();
            $n_res = Chat::orderByDesc('msg_id')->count();
            if($n_res!=0){ 
                $status=true;
            }   
            
        }

        if((($type=="first") || ($type=="current"))&& ($id!=null)){
            $results = Chat::where('msg_id',"<=",$id)->orderByDesc('msg_id')->limit(10)->get();
            $n_res =  Chat::where('msg_id',"<=",$id)->orderByDesc('msg_id')->count();
            if($n_res!=0){ 
                $status=true;
            } 
        }

        if(($type=="last")&& ($id!=null)){
            $results = Chat::where('msg_id',"<",$id)->orderByDesc('msg_id')->limit(10)->get();
            $n_res = Chat::where('msg_id',"<",$id)->orderByDesc('msg_id')->count();
            if($n_res!=0){ 
                $status=true;
            }   
        }


        $json = array("n_res" => $n_res,"results" => $results,"status" => $status);
        return $json;
    }



    function getUsername(){
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');

        return session('username');
    }




    function removeMsg($id){
        $session = session('username');
        $user = User::find($session);
        if (!isset($user)){ 
            return redirect('login');
        }
        
        $exists = $user->chat()->where('msg_id',$id)->first();
        if($exists == null){
            $response = array("op" => false);
            return $response;
        }
        $exists->delete();
        $response = array("op" => true);
        return $response;
    }




    function updateMsg(){

        
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');
            
        $request = request();



        $update = $user->chat()->where('msg_id',$request->msg_id)->first();
        

        $update->text_msg = $request->text;
        $update->updated = 1;
        
        $update->save();

        if ($update) {
            $response = array("op" => true); 
        } 
        else {
            $response = array("op" => false); 
        }

        return $response;



    }




}
?>
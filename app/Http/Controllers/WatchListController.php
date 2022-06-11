<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Chat;
use Illuminate\Http\Request;

class WatchListController extends Controller {

    public function index() {
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');
        return view("watch_list");
    }

    function add(){
        $request=request();
    }


    function remove($movie_id){
        
    }




}
?>
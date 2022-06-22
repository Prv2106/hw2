<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Chat;
use App\Models\MovieList;
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
        $session = session('username');
        $user = User::find($session);
        if (!isset($user)){ 
            return redirect('login');
        }
        $request=request();

        $exists = MovieList::where("username",$session)->where('movie_id',$request->movie_id)->first();
        if($exists != null){
            $response = array("op" => false);
            return $response;
        }

        $query =new MovieList;
        $query->username = $session;
        $query->movie_id = intVal($request -> movie_id);
        $query->img = $request->img;
        $query->overview = $request->overview;
        $query->title = $request->title;
        $query->vote = floatVal($request->vote);
        $query->popularity =floatVal($request->popularity);
        $query->release_date =$request->release_date;
        $query->save();

        if ($query) {
            $response = array("op" => true); 
        } 
        else {
            $response = array("op" => false); 
        }

        return $response;
    }


    function remove($movie_id){
        $session = session('username');
        $user = User::find($session);
        if (!isset($user)){ 
            return redirect('login');
        }
        $movie_id = intVal($movie_id);

        $exists = MovieList::where("username",$session)->where('movie_id',$movie_id)->first();
        if($exists == null){
            $response = array("op" => false);
            return $response;
        }
        $exists->delete();
        $response = array("op" => true);
        return $response;

    }

    function showAll(){
        $session = session('username');
        $user = User::find($session);
        if (!isset($user)){ 
            return redirect('login');
        }

        $status=false;

        $results = MovieList::where("username",$session)->get();
        $n_res = MovieList::where("username",$session)->count();
        if($n_res!=0){ 
            $status=true;
        }          

        $res = array();
        foreach($results as $result){
            $movie_id = $result['movie_id'];
            $shared = false;
            $shared_query = $user->chat()->where('movie_id',$movie_id)->first();
            if($shared_query != null){
                $shared=true;
            }
            
            $favorites=false;
            $exists = $user->favorites()->where('movie_id',$movie_id)->first();
            if($exists != null){
                $favorites=true;
            }

    
            $res[]=array("title" => $result['title'],"movie_id" => $result['movie_id'],"overview" => $result['overview'],"username" => $result['username'],
                "favorites" => $favorites, "img" => $result['img'],"release_date" => $result['release_date'],
                "vote" => $result['vote'], "shared" => $shared,"popularity" => $result['popularity']);

        }
    

        $json = array("results" => $res, "status" => $status);
        return $json;


    }


}
?>
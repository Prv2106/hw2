<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Favorite;
use App\Models\Chat;
use Illuminate\Http\Request;

class FavoritesController extends Controller {

    public function index() {
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');

        
        
        return view("favorites");
    }




    function addFavorites(){
        

    
        $session = session('username');
        $user = User::find($session);
        if (!isset($user)){ 
            return redirect('login');
        }

        $request = request();
        
        $exists = $user->favorites()->where('movie_id',$request->movie_id)->first();
        if($exists != null){
            $response = array("op" => false);
            return $response;
        }

        $query =new Favorite;

        $query->username = $session;
        $query->movie_id = $request -> movie_id;
        $query->img = $request->img;
        $query->overview = $request->overview;
        $query->title = $request->title;
        $query->vote = $request->vote;
        $query->save();

        

        if ($query) {
            $response = array("op" => true); 
        } 
        else {
            $response = array("op" => false); 
        }

        return $response;





    }




    function removeFavorites($movie_id){
        
        $session = session('username');
        $user = User::find($session);
        if (!isset($user)){ 
            return redirect('login');
        }
        
        

        $exists = $user->favorites()->where('movie_id',$movie_id)->first();
        if($exists == null){
            $response = array("op" => false);
            return $response;
        }
        $exists->delete();
        $response = array("op" => true);
        return $response;

        

    }





    function showFavorites($type=null,$id=null){        

        $session = session('username');
        $user = User::find($session);
        if (!isset($user)){ 
            return redirect('login');
        }

        
        $status=false;

        if(($type==null)||($id==null)){
            $results = $user->favorites()->orderBy('favorite_id')->limit(12)->get();
            $n_res = $user->favorites()->orderBy('favorite_id')->count();
            if($n_res!=0){ 
                $status=true;
            }            
        }
    
        if(($type=="first")&& ($id!=null)){
            $results = $user->favorites()->where('favorite_id',">=",$id)->orderBy('favorite_id')->limit(12)->get();
            $n_res = $user->favorites()->orderBy('favorite_id')->count();
            if($n_res!=0){ 
                $status=true;
            }            
        }

        if(($type=="current")&&($id!=null)){
            $results =$user->favorites()->where('favorite_id',">=",$id)->orderBy('favorite_id')->limit(12)->get();
            $n_res = $user->favorites()->where('favorite_id',">=",$id)->orderBy('favorite_id')->count();
            if($n_res!=0){ 
                $status=true;
            }            
        }

        
        if(($type=="last")&& ($id!=null)){
            $results = $user->favorites()->where('favorite_id',">",$id)->orderBy('favorite_id')->limit(12)->get();
            $n_res = $user->favorites()->where('favorite_id',">",$id)->orderBy('favorite_id')->count();
            if($n_res!=0){ 
                $status=true;
            }            
        }

        $res = array();
        
        foreach($results as $result){
            $movie_id = $result['movie_id'];
            $shared = false;
            $shared_query = $user->chat()->where('movie_id',$movie_id)->first();
            
            if($shared_query != null){
                $shared=true;
            }
            
            $endpoint = 'https://api.themoviedb.org/3/movie/' .$movie_id .'?api_key=' . env('TMDB_API_KEY') . '&language=it&region=IT';
            $url = $endpoint;
            $curl = curl_init();
            curl_setopt($curl, CURLOPT_URL,$url);
            curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
            $api_query = curl_exec($curl);
    
            
            $api_query = json_decode($api_query, true);
    
            curl_close($curl);
    
            $res[]=array("title" => $result['title'],"movie_id" => $result['movie_id'],"overview" => $result['overview'],"username" => $result['username'],
                "favorite_id" => $result['favorite_id'], "img" => $result['img'], "vote" => $result['vote'], "shared" => $shared,"popularity" => $api_query['popularity']);

        }
    

        $json = array("n_res" => $n_res,"results" => $res, "status" => $status);
        return $json;
    }







}
?>
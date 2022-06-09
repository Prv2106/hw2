<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;
use App\Models\Chat;
use App\Models\Favorite;


class ApiRequestController extends Controller {


    function popularMovies($page){
        $session = session('username');
        $user = User::find($session);
        if (!isset($session)){ 
            return redirect('login');
        }


        $endpoint = 'https://api.themoviedb.org/3/movie/popular?api_key=' . env('TMDB_API_KEY') .  '&language=it&region=IT&page=';
    

        $url = $endpoint . $page;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);

        $json = json_decode($result, true);

        curl_close($curl);

        $newJson = array();
        

        for ($i = 0; $i < count($json['results']); $i++) {
            $favorites=false;
            $movie_id = $json['results'][$i]['id'];
            $exists = $user->favorites()->where('movie_id',$movie_id)->first();
            if($exists != null){
                $favorites=true;
            }
            
            $shared = false;
            $shared_query = $user->chat()->where('movie_id',$movie_id)->first();
            if($shared_query != null){
                $shared=true;
            }
            
            $newJson[] = array(
                'id' => $json['results'][$i]['id'],
                'title' => $json['results'][$i]['title'],
                'poster_path' => $json['results'][$i]['poster_path'],
                'overview'=>$json['results'][$i]['overview'],
                'vote_average' => $json['results'][$i]['vote_average'],
                'release_date' => $json['results'][$i]['release_date'],
                'popularity' => $json['results'][$i]['popularity'],
                'favorites' => $favorites,
                'shared' => $shared
            );
        }

        return $newJson;

    }


    function searchMovies(){

        $session = session('username');
        $user = User::find($session);
        if (!isset($session)){ 
            return redirect('login');
        }
        $movie = request('movie');

        $endpoint = 'https://api.themoviedb.org/3/search/movie?api_key=' . env('TMDB_API_KEY') . '&language=it&region=IT&query=';

    
        
        
        
        $movie = urlencode($movie);
        $url = $endpoint . $movie;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);

        
        $json = json_decode($result, true);

        curl_close($curl);

        $newJson = array();


        for ($i = 0; $i < count($json['results']); $i++) {
            
            $favorites=false;
            $movie_id = $json['results'][$i]['id'];
            $exists = $user->favorites()->where('movie_id',$movie_id)->first();
            if($exists != null){
                $favorites=true;
            }
            
            $shared = false;
            $shared_query = $user->chat()->where('movie_id',$movie_id)->first();
            if($shared_query != null){
                $shared=true;
            }

            $newJson[] = array(
                'res' => $json['results'][$i],
                'favorites' => $favorites,
                'shared' => $shared
            );

    
        }

        return $newJson;


    }



    function topRatedMovies($page){
        $session = session('username');
        $user = User::find($session);
        if (!isset($session)){ 
            return redirect('login');
        }


        $endpoint = 'https://api.themoviedb.org/3/movie/top_rated?api_key=' . env('TMDB_API_KEY') . '&language=it&region=IT&page=';

        

        $url = $endpoint . $page;

        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);

        $json = json_decode($result, true);

        curl_close($curl);

        $newJson = array();

        for ($i = 0; $i < count($json['results']); $i++) {
            $favorites=false;
            $movie_id = $json['results'][$i]['id'];
            $exists = $user->favorites()->where('movie_id',$movie_id)->first();
            if($exists != null){
                $favorites=true;
            }
            
            $shared = false;
            $shared_query = $user->chat()->where('movie_id',$movie_id)->first();
            if($shared_query != null){
                $shared=true;
            }
            
            $newJson[] = array(
                'id' => $json['results'][$i]['id'],
                'title' => $json['results'][$i]['title'],
                'poster_path' => $json['results'][$i]['poster_path'],
                'overview'=>$json['results'][$i]['overview'],
                'vote_average' => $json['results'][$i]['vote_average'],
                'popularity' => $json['results'][$i]['popularity'],
                'release_date' => $json['results'][$i]['release_date'],
                'favorites' => $favorites,
                'shared' => $shared
            );
        }

        return $newJson;

    }




    function getGenreList(){
        $session = session('username');
        $user = User::find($session);
        if (!isset($session)){ 
            return redirect('login');
        }


        $url = 'https://api.themoviedb.org/3/genre/movie/list?api_key=' . env('TMDB_API_KEY') .  '&language=it&region=IT';
    
        
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);

        
        $json = json_decode($result, true);

        curl_close($curl);

        $newJson = array();

        for ($i = 0; $i < count($json['genres']); $i++) {
            $newJson[] = array(
                'name' => $json['genres'][$i]['name'],
                'id' => $json['genres'][$i]['id']
            );
        }

        return $newJson;
    }



    function searchByGenre($id,$page){

        $session = session('username');
        $user = User::find($session);
        if (!isset($session)){ 
            return redirect('login');
        }

        $endpoint = 'https://api.themoviedb.org/3/discover/movie?api_key=' . env('TMDB_API_KEY') . '&language=it&region=IT&with_genres=';


        $url = $endpoint . $id . "&page=" . $page;



        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);

        
        $json = json_decode($result, true);

        curl_close($curl);

        $newJson = array();

        for ($i = 0; $i < count($json['results']); $i++) {
            $favorites=false;
            $movie_id = $json['results'][$i]['id'];
            $exists = $user->favorites()->where('movie_id',$movie_id)->first();
            if($exists != null){
                $favorites=true;
            }
            
            $shared = false;
            $shared_query = $user->chat()->where('movie_id',$movie_id)->first();
            if($shared_query != null){
                $shared=true;
            }
            
            $newJson[] = array(
                'id' => $json['results'][$i]['id'],
                'title' => $json['results'][$i]['title'],
                'poster_path' => $json['results'][$i]['poster_path'],
                'overview'=>$json['results'][$i]['overview'],
                'vote_average' => $json['results'][$i]['vote_average'],
                'release_date' => $json['results'][$i]['release_date'],
                'popularity' => $json['results'][$i]['popularity'],
                'favorites' => $favorites,
                'shared' => $shared
            );
        }

        return $newJson;
    }


    function youtubeTrailer($search){

        $session = session('username');
        $user = User::find($session);
        if (!isset($session)){ 
            return redirect('login');
        }

        $endpoint = 'https://www.googleapis.com/youtube/v3/search?part=snippet&relevanceLanguage=it&videoEmbeddable=true&type=video&maxResults=1&key='
            . env('YOUTUBE_API_KEY') . '&q=';


        $url = $endpoint . urlencode($search);    
        $curl = curl_init();
        curl_setopt($curl, CURLOPT_URL,$url);
        curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
        $result = curl_exec($curl);

        
        $json = json_decode($result, true);

        return $json;           


    }

}
?>
<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return redirect('login');
});


Route::get("/login", "LoginController@login")->name("login");

Route::get("/logout", "LoginController@logout")->name("logout");

Route::post("/login", "LoginController@checkLogin");

Route::get('/signup', "SignupController@index")->name('signup');

Route::post('/signup', "SignupController@create");



Route::get('/home', "HomeController@index")->name('home');

Route::get('/signup/email/{email}', "SignupController@checkEmail");

Route::get("/signup/username/{username}", "SignupController@checkUsername");


Route::get('/top_rated', "TopRatedController@index")->name('top_rated');

Route::get('/genre', "GenreController@index")->name('genre');

Route::get('/chat', "ChatController@index")->name('chat');

Route::get('/favorites', "FavoritesController@index")->name('favorites');

Route::post('/favorites/add', "FavoritesController@addFavorites");

Route::get('/favorites/remove/{movie_id}', "FavoritesController@removeFavorites");

Route::get('/favorites/show/{type?}/{id?}',"FavoritesController@showFavorites");

Route::get('/chat/show/{type?}/{id?}',"ChatController@showMsg");

Route::post('/chat/add', "ChatController@addMsg");

Route::get('/chat/get_username', "ChatController@getUsername");

Route::get('/chat/remove/{id}', "ChatController@removeMsg");

Route::post('/chat/update', "ChatController@updateMsg");

Route::get('/api_request/popular/{page}',"ApiRequestController@popularMovies");

Route::get('/api_request/top_rated/{page}',"ApiRequestController@topRatedMovies");

Route::get('/api_request/genre_list/',"ApiRequestController@getGenreList");

Route::get('/api_request/search_by_genre/{id}/{page}',"ApiRequestController@searchByGenre");

Route::post('/api_request/search',"ApiRequestController@searchMovies");

Route::get('/api_request/youtube/{search}',"ApiRequestController@youtubeTrailer");


Route::get('/watch_list', "WatchListController@index")->name('watch_list');

Route::get('/watch_list/remove/{movie_id}', "WatchListController@remove");

Route::post('/watch_list/add', "WatchListController@add");

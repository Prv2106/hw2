<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;


class Favorite extends Model{

    protected $primaryKey = "favorite_id";
    public $timestamps = false;

    
    protected $fillable = [
        'username', 'movie_id', 'img', 'title', 'overview','favorite_id','vote'
    ];

    public function users(){
        return $this->belongsTo('App\Models\User');
    }
}


?>
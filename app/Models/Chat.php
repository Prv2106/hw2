<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Chat extends Model{

    protected $table = "chat";
    protected $primaryKey = "msg_id";
    public $timestamps = false;


    protected $fillable = [
        'username', 'date', 'img', 'title', 'movie_id','text_msg','msg_id','updated'
    ];

    public function users(){
        return $this->belongsTo('App\Models\User');
    }
}


?>
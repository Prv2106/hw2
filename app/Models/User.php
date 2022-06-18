<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Model{

    use HasFactory, Notifiable;

    protected $primaryKey = "username";
    protected $autoIncrement = false;
    protected $keyType = "string";
    public $timestamps = false;
    



    protected $hidden = [
        'pwd', 'email'
    ];


    protected $fillable = [
        'username', 'pwd', 'email', 'name', 'surname'
    ];

    public function favorites(){
        return $this->hasMany('App\Models\Favorite','username');  
    }
    
    public function chat(){ 
        return $this->hasMany('App\Models\Chat','username');
    }
    


}


?>
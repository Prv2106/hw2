<?php
namespace App\Http\Controllers;
use Illuminate\Routing\Controller;
use App\Models\User;

class TopRatedController extends Controller {

    public function index() {
        $session = session('username');
        $user = User::find($session);
        if (!isset($user))
            return redirect('login');
        
        return view("top_rated");
    }
}
?>
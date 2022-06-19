@extends('layouts.login_signup')

@section('title', ' Login')

@section('script')
<script src='{{ asset('js/login.js') }}' defer></script>
@endsection


@section('content')
<div>Inserisci le tue credenziali per accedere</div>
<main>
    <form name = "login"  method= "post" action="{{ route('login') }}">
    @csrf
        <span><label>Nome utente</label><input type='text' name='username' value='{{ old('username') }}'><div id="username-error"></div></span>
        <span><label>Password</label><input type='password' name='password'><div id="pwd-error"></div></span>
        <div id="empty-input" class="hidden"><p class="error">Non hai inserito tutti i campi</p></div>
        @if(isset($error))
            <p class = 'error' >{{ $error }}</p>
        @endif
        <p>Non hai un account? <a id="reg" href="{{ url('signup') }}">Registrati</a></p>
        <label>&nbsp;<input type='submit' id="submit" value="Accedi"></label>
    </form>
</main>
@endsection
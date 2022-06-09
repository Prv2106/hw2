@extends('layouts.login_signup')

@section('title', ' Registrazione')

@section('script')
<script src='{{ asset('js/signup.js') }}' defer></script>
<script type="text/javascript">
    const SIGNUP_ROUTE = "{{route('signup')}}";
</script>
@endsection


@section('content')
<div>Inserisci i tuoi dati:</div>
<main>
    <form name='signup' method='post' action="{{ route('signup') }}">
    @csrf
        <span><label>Nome</label><input type='text' name='name' value='{{ old('name') }}'><div id="name-error"></div></span>
        <span><label>Cognome</label><input type='text' name='surname' value='{{ old('surname') }}'><div id="surname-error"></div></span>
        <span><label>E-mail</label><input type='text' name='email' value='{{ old('email') }}'><div id="email-error"></div></span>
        <span><label>Nome utente</label><input type='text' name='username' value='{{ old('username') }}' ><div id="username-error"></div></span>
        <span><label>Password</label><input type='password' name='password' ><div id="pwd-error"></div></span>
        <span><label>Conferma password</label><input type='password' name='confirm_password'><div id="c-pwd-error"></div></span>
        <span><div id="empty-input" class="hidden"><p class="error">Devi compilare tutti i campi</p></div></span>
        <span><p>Hai già un account? <a id="reg" href="{{ route('login') }}">Accedi</a></p>
        <label>&nbsp;<input type='submit' id="submit" value="Registrati" {{-- disabled --}}></label>
    </form>
</main>

@endsection








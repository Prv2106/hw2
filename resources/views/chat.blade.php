@extends('layouts.page')


@section('title', ' Chat')


@section('css')
<link rel="stylesheet" href='{{ asset('css/chat.css') }}'/> 
@endsection


@section('script')
<script src='{{ asset('js/chat.js') }}' defer></script>
@endsection


@section('home_link')
<a href="{{ route('home') }}"><h1>Top Movies</h1></a>
@endsection

@section('links')
<a href="{{ route('home') }}">Home</a>
<a href="{{ route('genre') }}">Genere</a>
<a href="{{ route('top_rated') }}">Piu' votati</a>
<a href="{{ route('favorites') }}">Preferiti</a>
<a href="{{ route('watch_list') }}">Watch List</a>
<a href= "{{ route('logout') }}">Logout</a>
@endsection


@section('header')
<header>
    <article>
        <h1>Cerca film</h1> 
        <span>Ciao {{ $user['name'] }} consiglia agli altri utenti di Top Movies qualche film da guardare!</span>
        <form class ="search">
            <input type='text' id='search' value = "nome del film">
            <input type='submit' class='submit' value='Cerca'>
            <div id="close" data-content="close" class="hidden"><img  src ='{{ asset('images/x-regular-24.png') }}'/></div>
        </form>
        <img  class="circle hidden"  src ='{{ asset('images/circle-loading-gif.gif') }}'/>
        <section data-section = "movies">
            <section id = "album-view"></section>
        </section>
    <article>          
</header>
@endsection



@section('contents')
<article id="content">            
    <article id ="main-view">
        <section id="chat-display" class="empty">
            <img  class="circle" src ='{{ asset('images/circle-loading-gif.gif') }}'/>
        </section>
    </article>             
</article>
@endsection

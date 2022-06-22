@extends('layouts.page')


@section('title', ' Home')


@section('css')
<link rel="stylesheet" href='{{ asset('css/home.css') }}'/> 
@endsection


@section('script')
<script src='{{ asset('js/home.js') }}' defer></script>
@endsection


@section('home_link')
<h1>Top Movies</h1>
@endsection

@section('links')
<a href="{{ route('genre') }}">Genere</a>
<a href="{{ route('top_rated') }}">Piu' votati</a>
<a href="{{ route('chat') }}">Chat</a>
<a href="{{ route('watch_list') }}">Watch List</a>
<a href= "{{ route('logout') }}">Logout</a>
@endsection



@section('search')
<div data-section="search" class="mobile">
    <div data-content ="favorites"><a href="{{ route('favorites') }}"><img src ='{{ asset('images/heart-circle-solid-36.png') }}'/></a></div>
    <form id ="search" class="hidden">
        <input type='text' id='search-movies' value = "nome del film">
        <input type='submit' class='submit' value='Cerca'>
    </form>
    <div id="search-button" data-content="search"><img  src ='{{ asset('images/search-regular-36.png') }}'/></div>
    <div id="close" data-content="close" class="hidden"><img  src ='{{ asset('images/x-regular-24.png') }}'/></div>
</div>
@endsection


@section('header')
<header>
    <div id="overlay"></div>
    <h1>
        <div>Ciao {{ $user['name'] }} </div> 
        <strong>Ecco la raccolta dei migliori film di sempre</strong><br/>
        <em>Trova i tuoi film preferiti!</em><br/>              
    </h1>
</header>
@endsection

@section('search-mobile')
<article data-section="search-mobile">
    <h1>Cerca i tuoi film preferiti</h1>  
    <form class ="search-mobile">
        <input type='text' id='search-movies-mobile' value = "nome del film">
        <input type='submit' class='submit' value='Cerca'>
    </form>
</article>
@endsection


@section('contents')
<article data-section = "movies">
    <section id = "album-view" class="empty">
        <img  class="circle" src ='{{ asset('images/circle-loading-gif.gif') }}'/>
    </section>
</article>
<article id="youtube">
    <section id="youtube-view"></section>    
</article>  
@endsection

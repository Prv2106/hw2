@extends('layouts.page')


@section('title', ' Più Votati')


@section('css')
<link rel="stylesheet" href='{{ asset('css/top_rated.css') }}'/> 
@endsection


@section('script')
<script src='{{ asset('js/top_rated.js') }}' defer></script>
@endsection


@section('home_link')
<a href="{{ route('home') }}"><h1>Top Movies</h1></a>
@endsection

@section('links')
<a href="{{ route('home') }}">Home</a>
<a href="{{ route('genre') }}">Genere</a>
<a href="{{ route('chat') }}">Chat</a>
<a href="{{ route('favorites') }}">Preferiti</a>
<a href="{{ route('watch_list') }}">Watch List</a>
<a href= "{{ route('logout') }}">Logout</a>
@endsection

@section('contents')
<article id="album-background">
    <section data-section="album">
        <h1>Più Votati</h1>
        <div>Di seguito i titoli che hanno ricevuto i voti più alti</div>
        <img id="search-loading" class="circle hidden"  src ='{{ asset('images/circle-loading-gif.gif') }}'/>    
        <section id = "album-view"></section>
        <article id="youtube">
            <section id="youtube-view"></section>    
        </article> 
    </section>
</article>

@endsection

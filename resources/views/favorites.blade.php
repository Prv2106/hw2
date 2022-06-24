@extends('layouts.page')


@section('title', ' Preferiti')


@section('css')
<link rel="stylesheet" href='{{ asset('css/favorites.css') }}'/> 
@endsection


@section('script')
<script src='{{ asset('js/favorites.js') }}' defer></script>
@endsection


@section('home_link')
<a href="{{ route('home') }}"><h1>Top Movies</h1></a>
@endsection

@section('links')
<a href="{{ route('home') }}">Home</a>
<a href="{{ route('genre') }}">Genere</a>
<a href="{{ route('chat') }}">Chat</a>
<a href="{{ route('top_rated') }}">Piu' votati</a>
<a href="{{ route('watch_list') }}">Watch-list</a>
<a href= "{{ route('logout') }}">Logout</a>
@endsection

@section('contents')
<article id="favorites-background">
    <section data-section="favorites">
    <h1>Raccolta dei tuoi film preferiti</h1>
    <img id="loading" class="circle hidden"  src ='{{ asset('images/circle-loading-gif.gif') }}'/>    
        <section id = "album-view"></section>
        <article id="youtube">
            <section id="youtube-view"></section>    
        </article> 
    </section>
</article>
@endsection

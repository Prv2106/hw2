@extends('layouts.page')


@section('title', ' Watch-List')


@section('css')
<link rel="stylesheet" href='{{ asset('css/watch_list.css') }}'/> 
@endsection


@section('script')
<script src='{{ asset('js/watch_list.js') }}' defer></script>
@endsection


@section('home_link')
<a href="{{ route('home') }}"><h1>Top Movies</h1></a>
@endsection

@section('links')
<a href="{{ route('home') }}">Home</a>
<a href="{{ route('genre') }}">Genere</a>
<a href="{{ route('chat') }}">Chat</a>
<a href="{{ route('top_rated') }}">Piu' votati</a>
<a href="{{ route('favorites') }}">Preferiti</a>
<a href= "{{ route('logout') }}">Logout</a>
@endsection

@section('contents')
<article id="watch-list">
    <div id="watch-list-background">
        <section data-section="watch-list">
            <section id = "album-view" class="empty">
                <img  class="circle" src ='{{ asset('images/circle-loading-gif.gif') }}'/>
            </section>
            <article id="youtube">
                <section id="youtube-view"></section>    
            </article> 
        </section>
    </div>
</article>
@endsection

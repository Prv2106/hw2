@extends('layouts.page')


@section('title', ' Generi')


@section('css')
<link rel="stylesheet" href='{{ asset('css/genre.css') }}'/> 
@endsection


@section('script')
<script src='{{ asset('js/genre.js') }}' defer></script>
@endsection


@section('home_link')
<a href="{{ route('home') }}"><h1>Top Movies</h1></a>
@endsection

@section('links')
<a href="{{ route('home') }}">Home</a>
<a href="{{ route('top_rated') }}">Piu' votati</a>
<a href="{{ route('chat') }}">Chat</a>
<a href="{{ route('favorites') }}">Preferiti</a>
<a href= "{{ route('logout') }}">Logout</a>
@endsection

@section('contents')
<article id="genre-background">
    <section data-section="genre">
        <h1>Cerca per genere</h1>
        <div>
            <label for = "type">Scegli il genere:</label> 
            <select name="type" id="type">
                <option value = 'Azione'>Azione</option>
                <option value = 'Avventura'>Avventura</option>
                <option value = 'Animazione'>Animazione</option>
                <option value = 'Commedia'>Commedia</option>
                <option value = 'Crime'>Crime</option>
                <option value = 'Documentario'>Documentario</option>
                <option value = 'Dramma'>Drammatico</option>
                <option value = 'Famiglia'>Famiglia</option>
                <option value = 'Fantasy'>Fantascienza</option>
                <option value = 'Storia'>Storia</option>
                <option value = 'Horror'>Horror</option>
                <option value = 'Musica'>Musica</option>
                <option value = 'Mistero'>Misterioso</option>
                <option value = 'Romance'>Romantico</option>
                <option value = 'Fantascienza'>Fantascienza</option>
                <option value = 'televisione film'>Film televisivo</option>
                <option value = 'Thriller'>Thriller</option>
                <option value = 'Guerra'>Guerra</option>
                <option value = 'Western'>Western</option>
            </select>
            <button id="genre">cerca</button>
        </div>    
        <section id = "album-view"></section>
        <article id="youtube">
            <section id="youtube-view"></section>    
        </article> 
    </section>
</article>

@endsection

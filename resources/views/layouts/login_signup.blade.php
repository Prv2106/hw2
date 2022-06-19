<!doctype html>
<html>
    <head>
        <title>Top Movies - @yield('title')</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <link rel="stylesheet" href='{{ asset('css/login-signup-style.css') }}'/> 
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        @yield('script')
    </head>
    <body>
        <article id="heading">
                    <div data-section="title">
                        <div data-content="image"><img src='{{ asset('images/movie-regular-24.png') }}'/></div>
                        <h1>Top Movies</h1>
                    </div>
        </article>
        <article id="main-view">
            <section>
                @yield('content')
            </section>
        </article>
        
    </body>
</html> 

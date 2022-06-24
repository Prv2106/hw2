<!DOCTYPE html>
<html>
    <head>
        <title>Top Movies - @yield('title')</title>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href='{{ asset('css/style.css') }}'/> 
        @yield('css')
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@200&display=swap" rel="stylesheet">
        <script src='{{ asset('js/functions.js') }}' defer></script>
        <script type="text/javascript">
            const BASE_URL = "{{url('/')}}";
            const csrf_token = "{{ csrf_token() }}";
        </script>
        @yield('script')    
    </head>

    <body>
        <article id="heading">
            <div data-section="title">
                <div data-content="image"><img src='{{ asset('images/movie-regular-24.png') }}'/></div>
                @yield('home_link')
            </div>

            <nav>
                <div id="links" class="mobile">
                    @yield('links')
                </div> 
            </nav>
            @yield('search')
            <section data-section="menu-container">
                <div id="menu-view" class="hidden"></div>
                <div id="menu">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </section>
        </article>
        

        @yield('header')
        <section id="modal-view" class="hidden">
                    <h1></h1>
                    <form id ="text-box">
                        <textarea type='text' id='input-text' value= "Consiglio a tutti di guardare questo film!!!" maxlength="1300"></textarea>
                        <input type='submit' class='submit' value='invia'>
                    </form>
                    <div id="m-length">
                        <em>(massimo 1300 caratteri)</em>
                    </div>
        </section>
        @yield('search-mobile')
        
        @yield('contents')

        <footer>               
                <em>Powered by Alberto Provenzano</em>
                <em>Matricola: 1000001826</em>
                <em>Anno accademico 2021/2022</em>               
        </footer>
    </body>
</html>
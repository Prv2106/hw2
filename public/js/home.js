const poster = "https://image.tmdb.org/t/p/w500";
let page_count=1;



// Film in evidenza

function onJsonPopularMovies(json){
    const heading =document.querySelector('#album-heading');
    heading.innerHTML='';
    document.querySelector('#search-loading').classList.add('hidden');
    const h1 = document.createElement('h1');
    h1.textContent = "In evidenza";
    heading.appendChild(h1);

    const desc = document.createElement('div');
    desc.textContent = "Di seguito i titoli più popolari del momento";
    heading.appendChild(desc);

    const section = document.querySelector('#album-view');
    section.innerHTML='';

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);


    for(let result of json){       
        if((result.title === null)||(result.overview === '')||(result.vote_average === 0)||(result.poster_path === null)
            ||(result.release_date === '')){
            continue;
        }
        createMovieItem(album,result);
    }
    
    createButtons(section);
}


function onResponse(response){
    return response.json();
}


function popularMoviesRequest(){
    document.querySelector('#search-loading').classList.remove('hidden');
    fetch(BASE_URL + "/api_request/popular/" + page_count).then(onResponse).then(onJsonPopularMovies);
}

popularMoviesRequest();




function previousPageRequest(){
    --page_count;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    document.querySelector('#search-loading').classList.remove('hidden');
    fetch(BASE_URL + "/api_request/popular/" + page_count).then(onResponse).then(onJsonPopularMovies);
}

function nextPageRequest(){
    ++page_count;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    if(page_count >= 500){
        page_count=1;
    }
    document.querySelector('#search-loading').classList.remove('hidden');
    fetch(BASE_URL + "/api_request/popular/" + page_count).then(onResponse).then(onJsonPopularMovies);
}




// Cerca film

function onJsonSearchMovies(json){
    console.log(json)
    const section = document.querySelector('#album-view');
    document.querySelector('#search-loading').classList.add('hidden');
    section.innerHTML='';

    const popular = document.createElement('button');
    popular.classList.add('popular-button');
    popular.textContent = "Più popolari";
    popular.addEventListener('click',popularMoviesRequest);
    section.appendChild(popular);
    const h1 = document.createElement('h1');
    h1.textContent = "Trova film";
    section.appendChild(h1);

    const desc = document.createElement('div');
    desc.textContent = "Risultati della ricerca " + searched_movie;
    section.appendChild(desc);

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);


    let count=0;
    for(let result of json){
        if((result.res.title === null)||(result.res.overview === '')||(result.res.vote_average === 0)||(result.res.poster_path === null)||(result.res.release_date === '')){
            continue;
        }
        ++count;

        const box_contents = document.createElement('div');
        box_contents.classList.add('boxContents');
        album.appendChild(box_contents);


        const img_box = document.createElement('div');
        img_box.classList.add('imgBox');
        box_contents.appendChild(img_box);

        const img = document.createElement('img');
        img.src = poster + result.res.poster_path;
        img_box.appendChild(img);

        let div = document.createElement('div');
        box_contents.appendChild(div);

        let title = document.createElement('strong');
        title.textContent = result.res.title;
        div.appendChild(title);

        let id = document.createElement('small');
        id.textContent = result.res.id;
        id.classList.add('hidden');
        div.appendChild(id);

        let display = document.createElement('a');
        display.textContent = "Mostra trama";
        display.classList.add('display-overview');
        div.appendChild(display);
        display.addEventListener('click',showOverview);

        let overview = document.createElement('span');
        overview.classList.add('overview');
        overview.classList.add('hidden');
        overview.textContent = result.res.overview;
        div.appendChild(overview);

        
        let vote_container = document.createElement('div');
        vote_container.textContent = "Voto:";
        vote_container.classList.add('vote-container');
        div.appendChild(vote_container);
        let vote = document.createElement('em');
        vote.classList.add('vote');
        vote.textContent = result.res.vote_average;
        vote_container.appendChild(vote);


        let popularity = document.createElement('u');
        popularity.classList.add('hidden');
        popularity.classList.add('popularity');
            
        popularity.textContent = result.res.popularity;
        div.appendChild(popularity);
        
        
        const release_date = document.createElement('u');
        release_date.classList.add('hidden');
        release_date.classList.add('date');
        
        release_date.textContent = result.res.release_date;
        div.appendChild(release_date);


        
        
        const box = document.createElement('div');
        box.classList.add('interacts-box');
        div.appendChild(box);

        let favorites = document.createElement('img');
        favorites.classList.add('favorites-heart');
        if(result.favorites === false){
            favorites.src = "./images/heart-regular-24.png";
            favorites.addEventListener('click',addFavorites);
        }
        else{
            favorites.src = "./images/heart-regular-24.png";
            favorites.addEventListener('click',removeFavorites);
        }
        
        box.appendChild(favorites);

        if(result.res.vote_average > 5.5 && result.res.popularity > 30){
            const trailer = document.createElement('img');
            trailer.classList.add('trailer');
            trailer.src="./images/youtube-logo-24.png";
            box.appendChild(trailer);
            trailer.addEventListener('click',ytRequest);

            const release_date = document.createElement('u');
            release_date.classList.add('hidden');
            release_date.textContent = result.release_date;
            div.appendChild(release_date);
        }

        const watch_list = document.createElement('img');
        watch_list.classList.add('watch-list');

        
        if(result.list === false){
            watch_list.src = "./images/plus-regular-24.png";
            watch_list.addEventListener('click',addList);
        }
        else{
            watch_list.src = "./images/minus-regular-24.png";
            watch_list.addEventListener('click',removeList);
        }
        
        box.appendChild(watch_list);

        let share = document.createElement('img');
        share.classList.add('share');
        share.addEventListener('click',openModal);
        if(result.shared === false){
            share.src ="./images/share-regular-24 .png";
        }
        else{
        
            share.src = "./images/share-solid-24.png";
        }
        
        box.appendChild(share);

    
    }

    searchResultWidth(desc,searched_movie,count);


}


let searched_movie;

function searchMoviesRequest(event){
    event.preventDefault();
    const input = event.currentTarget.querySelector('input');
    searched_movie = input.value;

    document.querySelector('#album-heading').innerHTML='';
    document.querySelector('#album-view').innerHTML='';


    document.querySelector('#search-loading').classList.remove('hidden');

    const formdata = new FormData();
    formdata.append("movie", input.value);
    formdata.append("_token", csrf_token);

    
    if((input.value !== '')&&(input.value !== "nome del film")){        
        fetch(BASE_URL + "/api_request/search/" ,
            {method: 'post',body: formdata}
        ).then(onResponse).then(onJsonSearchMovies);
        
    }
    else{
        
        const section = document.querySelector('#album-view');
        section.innerHTML='';

        const popular = document.createElement('button');
        popular.classList.add('popular-button');
        popular.textContent = "Più popolari";
        popular.addEventListener('click',popularMoviesRequest);
        section.appendChild(popular);
        
        const h1 = document.createElement('h1');
        h1.textContent = "Trova film";
        section.appendChild(h1);

        const desc = document.createElement('div');
        desc.textContent = "Non hai inserito il nome del film";
        section.appendChild(desc);
        
        
    }
    
}

const form_search = document.querySelector('#search').addEventListener('submit',searchMoviesRequest);
const form_search_mobile = document.querySelector('form.search-mobile').addEventListener('submit',searchMoviesRequest);


function onClickSearchButton(){ 
    document.querySelector('#search').classList.remove('hidden');
    document.querySelector('#close').classList.remove('hidden');
    document.querySelector('#search-button').classList.add('hidden');    
}

function onClickCloseButton(){
    document.querySelector('#search').classList.add('hidden');
    document.querySelector('#close').classList.add('hidden');
    document.querySelector('#search-button').classList.remove('hidden');    
}




const close_button = document.querySelector('#close').addEventListener('click',onClickCloseButton);
const search_button = document.querySelector('#search-button').addEventListener('click',onClickSearchButton);






const inputs =document.querySelectorAll('input');

for(let input of inputs){
    input.addEventListener('focus',onFocus);
    input.addEventListener('blur',onBlur);
}   




// Parte Mobile

function onClick2(){    
    document.querySelector('#menu-view').innerHTML='';
    document.querySelector('#menu').addEventListener('click',onClick1);
}

function onClick1(){

    const menu = document.querySelector('#menu-view');
    menu.classList.remove('hidden');
    menu.innerHTML='';

    let genre = document.createElement('a');
    genre.textContent = "Genere";
    genre.href="/genre";
    menu.appendChild(genre);


    let top_rated = document.createElement('a');
    top_rated.textContent = "Più votati";
    top_rated.href = "/top_rated";
    menu.appendChild(top_rated);

    

    let chat = document.createElement('a');
    chat.textContent = "Chat";
    chat.href="/chat";
    menu.appendChild(chat);


    let favorites = document.createElement('a');
    favorites.textContent = "Preferiti";
    favorites.href='/favorites';
    menu.appendChild(favorites);

    let watch_list = document.createElement('a');
    watch_list.textContent = "Watch List";
    watch_list.href="/watch_list";
    menu.appendChild(watch_list);  

    let logout = document.createElement('a');
    logout.textContent = "Logout";
    logout.href="/logout";
    menu.appendChild(logout);
    

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);
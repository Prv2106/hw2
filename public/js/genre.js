const poster = "https://image.tmdb.org/t/p/w500";

let page_count=1;

function onJsonGenre(json){
    const section = document.querySelector('#album-view');
    section.classList.remove('empty');
    section.innerHTML='';

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);

    for(let result of json){
        if((result.title === null)||(result.overview === '')||(result.vote_average === 0)||(result.poster_path === null)||(result.release_date === '')){
            continue;
        }
        createMovieItem(album,result);
        
    }

    
    createButtons(section);


}




let genre_list={};


function onJsonGenreType(json){
    for(let result of json){
        genre_list[result.name] = result.id;
    }
    
}



let previous_genre_id = 28;


function genreRequest(){
    let genre = document.querySelector('#type').value;
    const genre_id = genre_list[genre];
    if(genre_id !== previous_genre_id){
        page_count=1;
    }
    previous_genre_id = genre_id;
    fetch(BASE_URL + "/api_request/search_by_genre/" + genre_id + "/"+ page_count).then(onResponse).then(onJsonGenre);
}



fetch(BASE_URL + "/api_request/genre_list").then(onResponse).then(onJsonGenreType);

const genre_button = document.querySelector('#genre');

genre_button.addEventListener('click',genreRequest);



fetch(BASE_URL + "/api_request/search_by_genre/" + 28 + "/"+ 1).then(onResponse).then(onJsonGenre);



function onResponse(response){
    return response.json();
}


function previousPageRequest(){
    --page_count;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    genreRequest();
}

function nextPageRequest(){
    ++page_count;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    if(page_count >= 60){
        page_count=1;
    }
    genreRequest();
}


function onAddMsgResponse(response){
    return response.json();
}




function onClick2(){    
    document.querySelector('#menu-view').innerHTML='';
    const menu = document.querySelector('#menu').addEventListener('click',onClick1);
}

function onClick1(){

    const menu = document.querySelector('#menu-view');
    menu.classList.remove('hidden');
    menu.innerHTML='';

    let home = document.createElement('a');
    home.textContent = "Home";
    home.href="/home";
    menu.appendChild(home);

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
    favorites.href="/favorites";
    menu.appendChild(favorites);
    

    let watch_list = document.createElement('a');
    chat.textContent = "Watch List";
    chat.href="/watch_list";
    menu.appendChild(watch_list);  

    let logout = document.createElement('a');
    logout.textContent = "Logout";
    logout.href="/logout";
    menu.appendChild(logout);
    

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);





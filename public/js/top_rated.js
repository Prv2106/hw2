const poster = "https://image.tmdb.org/t/p/w500";



function onJson(json){
    const section = document.querySelector('#album-view');
    section.innerHTML='';
    document.querySelector('#search-loading').classList.add('hidden');
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




function onResponse(response){
    return response.json();
}

let page_count=1;

function topRatedRequest(){
    document.querySelector('#search-loading').classList.remove('hidden');
    fetch(BASE_URL + "/api_request/top_rated/" + page_count).then(onResponse).then(onJson);
}


topRatedRequest();




function previousPageRequest(){
    --page_count;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    document.querySelector('#search-loading').classList.remove('hidden');
    fetch(BASE_URL + "/api_request/top_rated/" + page_count).then(onResponse).then(onJson);
}

function nextPageRequest(){
    ++page_count;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    if(page_count >= 100){
        page_count=1;
    }
    document.querySelector('#search-loading').classList.remove('hidden');
    fetch(BASE_URL + "/api_request/top_rated/" + page_count).then(onResponse).then(onJson);
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

    let home = document.createElement('a');
    home.textContent = "Home";
    home.href="/home";
    menu.appendChild(home);

    let genre = document.createElement('a');
    genre.textContent = "Genere";
    genre.href="/genre";
    menu.appendChild(genre);

    let chat = document.createElement('a');
    chat.textContent = "Chat";
    chat.href="/chat";
    menu.appendChild(chat);


    let favorites = document.createElement('a');
    favorites.textContent = "Preferiti";
    favorites.href="/favorites";
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
const poster = "https://image.tmdb.org/t/p/w500";


function onJson(json){
    console.log(json)
    const section = document.querySelector('#album-view');
    section.innerHTML='';
    const h1 = document.createElement('h1');
    h1.textContent = "Più Votati";
    section.appendChild(h1);

    const desc = document.createElement('div');
    desc.textContent = "Di seguito i titoli che hanno ricevuto i voti più alti";
    section.appendChild(desc);

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
    fetch(BASE_URL + "/api_request/top_rated/" + page_count).then(onResponse).then(onJson);
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
    

    let logout = document.createElement('a');
    logout.textContent = "Logout";
    logout.href="/logout";
    menu.appendChild(logout);
    

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);

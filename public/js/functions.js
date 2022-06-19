function hideOverview(event){
    let element = event.currentTarget;
    element.textContent = "Mostra trama";
    element.parentNode.parentNode.querySelector('span').classList.add('hidden');
    element.removeEventListener('click',hideOverview);
    element.addEventListener('click',showOverview);

}


function showOverview(event){ 
    let element = event.currentTarget;
    element.textContent = "Nascondi trama";

    element.parentNode.parentNode.querySelector('span').classList.remove('hidden');
    element.removeEventListener('click',showOverview);
    element.addEventListener('click',hideOverview);
}



function removeFavorites(event){
    let element = event.currentTarget;
    element.classList.add('removed');


    let movie_id = element.parentNode.parentNode.querySelector('small').textContent

    fetch(BASE_URL + "/favorites/remove/" + encodeURIComponent(movie_id)).then(onRemoveResponse).then(onJsonRemoveFavorites);
}

function onRemoveResponse(response){
    return response.json();
}

function onJsonRemoveFavorites(json){
    let button = document.querySelector('img.removed');
    if(json.op===true){
        button.src="./images/heart-regular-24.png";
        button.addEventListener('click',addFavorites);
        button.removeEventListener('click',removeFavorites);
        button.classList.remove('removed');
    }
}


function addFavorites(event){
    let element = event.currentTarget;
    element.classList.add('added');


    let img_src = element.parentNode.parentNode.parentNode.querySelector('img').src;
    let title = element.parentNode.parentNode.querySelector('strong').textContent;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent
    let vote = element.parentNode.parentNode.querySelector('em').textContent;
    let overview = element.parentNode.parentNode.querySelector('span').textContent;
    let popularity = element.parentNode.parentNode.querySelector('u.popularity').textContent;
    let release_date = element.parentNode.parentNode.querySelector('u.date').textContent;
    
    

    const formdata = new FormData();
    formdata.append("img", img_src);
    formdata.append("title", title);
    formdata.append("movie_id", movie_id);
    formdata.append("vote", vote);
    formdata.append("overview", overview);
    formdata.append("popularity", popularity);
    formdata.append("release_date", release_date);
    formdata.append("_token", csrf_token);
    
    fetch(BASE_URL + "/favorites/add"  ,
    {method: 'post', body: formdata}
    ).then(onAddFavoritesResponse).then(onAddFavoritesJson);


}

function onAddFavoritesResponse(response){
    return response.json();
}


function onAddFavoritesJson(json){
    let button = document.querySelector('img.added');
    if(json.op === true){
        button.src="./images/heart-solid-24.png";
        button.addEventListener('click',removeFavorites);
        button.removeEventListener('click',addFavorites);
        button.classList.remove('added');
    }
}


function addMessage(event){
    event.preventDefault();
    const title = shared_movie.title;
    const img = shared_movie.poster;
    const movie_id = shared_movie.movie_id;
    const text = document.querySelector('#input-text').value;

    const formdata = new FormData();
    formdata.append("img", img);
    formdata.append("title", title);
    formdata.append("movie_id", movie_id);
    formdata.append("text", text);
    formdata.append("_token", csrf_token);

        
    
    fetch(BASE_URL + "/chat/add" ,
        {method: 'post',body: formdata}
    ).then(onAddMsgResponse).then(onAddMsgJson);   
    

}

function onAddMsgJson(json){
    if(json.op === true){
        let share =document.querySelector('img.shared');
        share.classList.remove('shared');
        share.src = "./images/share-solid-24.png";
    }
}

let shared_movie = {
    'title': '',
    'poster': '',
    'movie_id': ''
}


function openModal(event){
    event.currentTarget.classList.add('shared');
    let h1 = document.querySelector('#modal-view h1');
    h1.textContent = "Scrivi un messaggio";
    let input= document.querySelector('#input-text');
    input.addEventListener('click',onFocusMsg);
    input.addEventListener('blur',onBlurMsg);
    form_msg.addEventListener('submit',addMessage);
    input.value = "Consiglio a tutti di guardare questo film!!!";
    const element = event.currentTarget;
    shared_movie.title=element.parentNode.parentNode.querySelector('strong').textContent;
    shared_movie.poster = element.parentNode.parentNode.parentNode.querySelector('img').src;
    shared_movie.movie_id = element.parentNode.parentNode.querySelector('small').textContent;
    

    

    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
    modalView.classList.remove('hidden');
}


function closeModal(){ 
    document.body.classList.remove('no-scroll');
    modalView.classList.add('hidden');    
}

const modalView = document.querySelector('#modal-view');
modalView.addEventListener('click',closeModal);

const form_msg = document.querySelector('#text-box');

form_msg.addEventListener('submit',closeModal);

function onBlur(event){
    let element = event.currentTarget;
    if(element.value === ""){
        element.value="nome del film";
    }
}
function onBlurMsg(event){
    let element = event.currentTarget;
    if(element.value === ""){
        element.value="Consiglio a tutti di guardare questo film!!!";
    }
}

function onFocus(event){
    let element = event.currentTarget;
    if(element.value === "nome del film"){
        element.value="";
    }

}

function onFocusMsg(event){
    let element = event.currentTarget;
    event.stopPropagation();
    if(element.value === "Consiglio a tutti di guardare questo film!!!"){
        element.value="";
    }
}


function clearYoutubeView(){
    const youtube_view =document.querySelector('#youtube-view');
    youtube_view.innerHTML="";
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
}

function onytResponse(response){
    return response.json();
    
}


function onytJson(json){
    const section =document.querySelector('#youtube-view section');

    const h1 = document.createElement('h1');
    h1.textContent ="Trailer";
    section.appendChild(h1);
    if(json.items.length === 0){
        const not_found = document.createElement('div');
        not_found.classList.add('not-found');
        not_found.textContent = "Non sono stati trovati trailer del film cercato";
        section.appendChild(not_found);
    }   
    else{
        const box_contents = document.createElement('div');
        box_contents.classList.add('yt-box');
        section.appendChild(box_contents);
        const iframe = document.createElement('iframe');
        iframe.src = "https://www.youtube-nocookie.com/embed/" + json.items[0].id.videoId;
        iframe.frameBorder = 0;
        iframe.allow = "accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;fullscreen  ";
        iframe.classList = "video_iframe";
        box_contents.appendChild(iframe);
    
    }

    const exit = document.createElement('img');
    exit.addEventListener('click',clearYoutubeView);
    exit.src = "./images/x-regular-24.png";
    exit.classList.add('x-button');
    section.appendChild(exit);
    
}



function ytRequest(event){
    const element = event.currentTarget;
    const youtube_view =document.querySelector('#youtube-view');
    youtube_view.innerHTML="";

    const section = document.createElement('section');
    youtube_view.appendChild(section);

    window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });

    let release_date = element.parentNode.parentNode.querySelector('u.date').textContent;
    let date = release_date.substr(0, 4);
    let title = element.parentNode.parentNode.querySelector('strong').textContent;
    title = title + " " +  date + " trailer ita";
    
    console.log(title)
    fetch(BASE_URL + "/api_request/youtube/" + encodeURIComponent(title)).then(onytResponse).then(onytJson);

}

function createMovieItem(album,result){

    const box_contents = document.createElement('div');
    box_contents.classList.add('boxContents');
    album.appendChild(box_contents);

    const img_box = document.createElement('div');
    img_box.classList.add('imgBox');
    box_contents.appendChild(img_box);

    const img = document.createElement('img');
    img.src = poster + result.poster_path;
    img_box.appendChild(img);

    let div = document.createElement('div');
    box_contents.appendChild(div);

    let title = document.createElement('strong');
    title.textContent = result.title;
    div.appendChild(title);

    let id = document.createElement('small');
    id.textContent = result.id;
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
    overview.textContent = result.overview;
    div.appendChild(overview);

    
    let vote_container = document.createElement('div');
    vote_container.textContent = "Voto: ";
    div.appendChild(vote_container);
    let vote = document.createElement('em');
    vote.classList.add('vote');
    vote.textContent = result.vote_average;
    div.appendChild(vote);


    let popularity = document.createElement('u');
    popularity.classList.add('hidden');
    popularity.classList.add('popularity');
        
    popularity.textContent = result.popularity;
    div.appendChild(popularity);
    
    
    const release_date = document.createElement('u');
    release_date.classList.add('hidden');
    release_date.classList.add('date');
    
    release_date.textContent = result.release_date;
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
        favorites.src = "./images/heart-solid-24.png";
        favorites.addEventListener('click',removeFavorites);
    }
    
    box.appendChild(favorites);

    

    if(result.vote_average > 5.5 && result.popularity > 30){
        const trailer = document.createElement('img');
        trailer.classList.add('trailer');
        trailer.src="./images/youtube-logo-24.png";
        box.appendChild(trailer);
        trailer.addEventListener('click',ytRequest);
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


function createButtons(section){
const button_container = document.createElement('div');
button_container.classList.add('button-container');
section.appendChild(button_container);


if(page_count>1){
    let back_button = document.createElement('button');
    back_button.textContent = "pagina precedente";
    button_container.appendChild(back_button);
    back_button.addEventListener('click',previousPageRequest);
}

let next_page = document.createElement('button');
        next_page.textContent = "pagina succesiva";
        button_container.appendChild(next_page);
        next_page.addEventListener('click',nextPageRequest);
}

function searchResultWidth(desc,searched_movie,count){
if(count===1){
    document.querySelector('div.boxContents').classList.add('max-width');
}   
else if(count <4){
    let box_contents = [];
    box_contents = document.querySelectorAll('div.boxContents');

    for(let box of box_contents){
        box.classList.add('inc-width');
    }

}

if(count=== 0){
    desc.textContent = "Non sono stati trovati risultati per " + searched_movie;
}

}




function onRemoveListJson(json){
    let button = document.querySelector('img.removed-list');
    
    if(json.op===true){
        button.src="./images/plus-regular-24.png";
        button.addEventListener('click',addList);
        button.removeEventListener('click',removeList);
        button.classList.remove('removed-list');
    }

    
}

function onRemoveListResponse(response){
    return response.json();
}

function removeList(event){
    let element = event.currentTarget;

    
    element.classList.add('removed-list');
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent
    

    fetch(BASE_URL + "/watch_list/remove/" + movie_id).then(onRemoveListResponse).then(onRemoveListJson);

}










function addList(event){
    let element = event.currentTarget;
    element.classList.add('added-list');


    let img_src = element.parentNode.parentNode.parentNode.querySelector('img').src;
    let title = element.parentNode.parentNode.querySelector('strong').textContent;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent
    let vote = element.parentNode.parentNode.querySelector('em').textContent;
    let overview = element.parentNode.parentNode.querySelector('span').textContent;
    let popularity = element.parentNode.parentNode.querySelector('u.popularity').textContent;
    let release_date = element.parentNode.parentNode.querySelector('u.date').textContent;
    
    

    const formdata = new FormData();
    formdata.append("img", img_src);
    formdata.append("title", title);
    formdata.append("movie_id", movie_id);
    formdata.append("vote", vote);
    formdata.append("overview", overview);
    formdata.append("popularity", popularity);
    formdata.append("release_date", release_date);
    formdata.append("_token", csrf_token);

    
    fetch(BASE_URL + "/watch_list/add"  ,
    {method: 'post', body: formdata}
    ).then(onAddListResponse).then(onAddListJson);


}

function onAddListResponse(response){
    return response.json();
}


function onAddListJson(json){
    console.log(json)
    let button = document.querySelector('img.added-list');
    if(json.op === true){
        button.src="./images/minus-regular-24.png";
        button.addEventListener('click',removeFavorites);
        button.removeEventListener('click',addFavorites);
        button.classList.remove('added-list');
    }
}
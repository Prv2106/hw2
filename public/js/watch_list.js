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


    let top_rated = document.createElement('a');
    top_rated.textContent = "Più votati";
    top_rated.href = "/top_rated";
    menu.appendChild(top_rated);

    let chat = document.createElement('a');
    chat.textContent = "Chat";
    chat.href="/chat";
    menu.appendChild(chat);
    
    let watch_list = document.createElement('a');
    chat.textContent = "Preferiti";
    chat.href="/favorites";
    menu.appendChild(watch_list);    


    let logout = document.createElement('a');
    logout.textContent = "Logout";
    logout.href="/logout";
    menu.appendChild(logout);
    

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);





function onAddMsgResponse(response){
    return response.json();
}



function onShowListJson(json){
    console.log(json);
    const section = document.querySelector('#album-view');
    section.classList.remove('empty');
    section.innerHTML='';
    const h1 = document.createElement('h1');
    h1.textContent = "La tua lista";
    section.appendChild(h1);

    const  album = document.createElement('section');
    album.classList.add('album-view');
    section.appendChild(album);


    let count = 0;
    if(json.status === false){
        const desc = document.createElement('div');
        desc.textContent = "Non hai ancora aggiunto titoli alla tua Lista";
        section.appendChild(desc);
        section.classList.add('empty');
    }
    else{ 
        for(let result of json.results){
            count++;
            const box_contents = document.createElement('div');
            box_contents.classList.add('boxContents');
            album.appendChild(box_contents);

            const img_box = document.createElement('div');
            img_box.classList.add('imgBox');
            box_contents.appendChild(img_box);

            const img = document.createElement('img');
            img.src = result.img;
            img_box.appendChild(img);

            let div = document.createElement('div');
            box_contents.appendChild(div);

            let title = document.createElement('strong');
            title.textContent = result.title;
            div.appendChild(title);

            let id = document.createElement('small');
            id.textContent = result.movie_id;
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


        
            

            if(result.vote > 5.5 && result.popularity > 30){
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
            watch_list.src = "./images/minus-regular-24.png";
            box.appendChild(watch_list);
            watch_list.addEventListener('click',removeListRequest);
            

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
    }




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



}




function onShowListResponse(response){
    return response.json();
}


function showListRequest(){
    fetch(BASE_URL + "/watch_list/show").then(onShowListResponse).then(onShowListJson);
}

showListRequest();

function onListRemove(){
    showListRequest();
}

function onListRemoveResponse(response){
    return response.json();
}


function removeListRequest(event){
    let element = event.currentTarget;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent
    fetch(BASE_URL + "/watch_list/remove/" + movie_id).then(onListRemoveResponse).then(onListRemove);
}

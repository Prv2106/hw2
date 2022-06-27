
let page=0;
let last_element;
let first_element=[];


// Rimuovi dai preferiti

function onFavoritesRemove(){
    showCurrentPage();
}

function onFavoritesRemoveResponse(response){
    return response.json();
}


function removeFavoritesRequest(event){
    let element = event.currentTarget;
    let movie_id = element.parentNode.parentNode.querySelector('small').textContent
    fetch(BASE_URL + "/favorites/remove/" + movie_id).then(onFavoritesRemoveResponse).then(onFavoritesRemove);
}


function updateFavorites(){
    favoritesRequest();
}


// Visualizzazione dei preferiti

function onJson(json){ 
    const section = document.querySelector('#album-view');
    section.innerHTML='';

    document.querySelector('#loading').classList.add('hidden');

    if((json.status === false)){

        if(page>0){
            --page;
        showCurrentPage();
        }
        else{
            const desc = document.createElement('div');
            desc.textContent = "Non hai ancora aggiunto titoli alla tua raccolta";
            section.appendChild(desc);
        }
    }
    else{
        const  album = document.createElement('section');
        album.classList.add('album-view');
        section.appendChild(album);

        let num_favorites=0;
        let count=0;

        for(let result of json.results){
            ++num_favorites;
            ++count;
            
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
            display.addEventListener('click',showOverview);
            div.appendChild(display);
            

            let overview = document.createElement('span');
            overview.classList.add('overview');
            overview.classList.add('hidden');
            overview.textContent = result.overview;
            div.appendChild(overview);
    
    
            let vote_container = document.createElement('div');
            vote_container.textContent = "Voto:";
            vote_container.classList.add('vote-container');
            div.appendChild(vote_container);

            let vote = document.createElement('em');
            vote.classList.add('vote');
            vote.textContent = result.vote;
            vote_container.appendChild(vote);

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
            favorites.src="./images/heart-solid-24.png";
            favorites.addEventListener('click',removeFavoritesRequest);
            box.appendChild(favorites);

            if(num_favorites===1){
                first_element[page]=result.favorite_id;
            }
            last_element = result.favorite_id;


            if(result.vote > 5.5 && result.popularity > 30){
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

        const button_container = document.createElement('div');
        button_container.classList.add('button-container');
        section.appendChild(button_container);
        if(page>0){
            let back_button = document.createElement('button');
            back_button.textContent = "pagina precedente";
            button_container.appendChild(back_button);
            back_button.addEventListener('click',previousPage)
        }
        if((num_favorites === 12)&&(json.n_res >12)){
            let next_page = document.createElement('button');
            next_page.textContent = "pagina succesiva";
            button_container.appendChild(next_page);
            next_page.addEventListener('click',nextPage);
        }
    


    }


}

function showCurrentPage(){
    document.querySelector('#loading').classList.remove('hidden');
    fetch(BASE_URL + "/favorites/show/current/" + first_element[page]).then(onShowFavoritesResponse).then(onJson);
}


function onShowFavoritesResponse(response){
    return response.json();
}




function favoritesRequest(){    
    document.querySelector('#loading').classList.remove('hidden');
    fetch(BASE_URL + "/favorites/show/").then(onShowFavoritesResponse).then(onJson);
}


favoritesRequest();




function previousPage(){
    --page;
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    document.querySelector('#loading').classList.remove('hidden');
    fetch(BASE_URL + "/favorites/show/first/" + first_element[page]).then(onShowFavoritesResponse).then(onJson);
}



function nextPage(){
    page++;
    window.scroll({
        top: 0,
        left: 0,
        behavior: 'smooth'
    });
    document.querySelector('#loading').classList.remove('hidden');
    fetch(BASE_URL + "/favorites/show/last/" + last_element).then(onShowFavoritesResponse).then(onJson);
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


    let top_rated = document.createElement('a');
    top_rated.textContent = "Più votati";
    top_rated.href = "/top_rated";
    menu.appendChild(top_rated);

    let chat = document.createElement('a');
    chat.textContent = "Chat";
    chat.href="/chat";
    menu.appendChild(chat);
    
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
const poster = "https://image.tmdb.org/t/p/w500";
let username;



function onGetUsername(user){
    username = user;
    showMessage();
}

function usernameResponse(response){
    return response.text();
}

function getUsername(){
    fetch(BASE_URL + "/chat/get_username").then(usernameResponse).then(onGetUsername);
}

getUsername();

function onResponse(resposne){
    return resposne.json();
}


function removeMessage(event){
    let element = event.currentTarget;
    let msg_id = element.parentNode.parentNode.parentNode.querySelector('em').textContent;
    fetch(BASE_URL + "/chat/remove/" + encodeURIComponent(msg_id)).then(onResponse).then(showCurrentMsg);
}



let last_element;
let first_element=[];
let page=0;

// Visualizzazione dei messaggi

function displayChat(json){
    const display = document.querySelector('#chat-display');
    display.classList.remove('empty');
    display.innerHTML="";
    display.classList.remove('empty-chat');
    


    if((json.status === false)){
        if(page>0){
            --page;
        showCurrentMsg();
        }
        else{
            const desc = document.createElement('strong');
            desc.textContent = "Non sono ancora presenti messaggi nella chat";
            display.appendChild(desc);
            display.classList.add('empty-chat');
        }
    }
    else{ 
        let num_results=0;

        for(let result of json.results){
            
            ++num_results;
            let chat_box = document.createElement('div');
            chat_box.classList.add('chat-box');
            display.appendChild(chat_box);

            let text_side = document.createElement('div');
            text_side.classList.add('text-side');
            chat_box.appendChild(text_side);

            let text_container = document.createElement('div');
            text_container.classList.add('text-container');
            text_side.appendChild(text_container);

            let user = document.createElement('strong');
            user.textContent = result.username;
            user.classList.add('username-chat')
            text_container.appendChild(user);


            let date = document.createElement('small');
            date.textContent = result.date;
            if(result.updated === 1){
                date.textContent = date.textContent  + " ✓modificato"; 
            }
            date.classList.add('date');
            text_container.appendChild(date);

            let text_msg = document.createElement('p');
            text_msg.textContent = result.text_msg;
            text_container.appendChild(text_msg);

            
            last_element = result.msg_id;
            if(num_results === 1){
                first_element[page] = result.msg_id;
            }
            
            let msg_id = document.createElement('em');
            msg_id.textContent = result.msg_id;
            msg_id.classList.add('id');
            msg_id.classList.add('hidden');
            text_side.appendChild(msg_id);


            if(result.username === username){
                let update_box = document.createElement('div');
                update_box.classList.add('update-box');
                text_side.appendChild(update_box);
                
                let update_msg = document.createElement('div');
                update_msg.classList.add('update-msg');
                update_box.appendChild(update_msg);

                let pencil = document.createElement('img');
                pencil.addEventListener('click',updateMsgModal);
                pencil.src="./images/pencil-regular-24.png";
                update_msg.appendChild(pencil);

                let remove_msg = document.createElement('div');
                remove_msg.classList.add('remove-msg');
                update_box.appendChild(remove_msg);

                let trash = document.createElement('img');
                trash.addEventListener('click',removeMessage);
                trash.src="./images/trash-regular-24.png";
                remove_msg.appendChild(trash);
            }

            let movie_side = document.createElement('div');
            movie_side.classList.add('movie-side');
            chat_box.appendChild(movie_side);
    
    
            const img_box = document.createElement('div');
            img_box.classList.add('imgBoxChat');
            movie_side.appendChild(img_box);

            const img = document.createElement('img');
            img.src = result.img;
            img_box.appendChild(img);

            let title = document.createElement('strong');
            title.textContent = result.title;
            title.classList.add('movie-title');
            movie_side.appendChild(title);
            
        }
        const button_container = document.createElement('div');
        button_container.classList.add('button-container');
        display.appendChild(button_container);

        if(num_results === 1){
            display.classList.add('inc-height');
        }
        else{
            display.classList.remove('inc-height');
        }

        if(page>0){
            let back_button = document.createElement('button');
            back_button.textContent = "Pagina precedente";
            button_container.appendChild(back_button);
            back_button.addEventListener('click',back)
        }
        if((num_results === 10)&&(json.n_res>10)){
            let next_page = document.createElement('button');
            next_page.textContent = "Pagina successiva";
            button_container.appendChild(next_page);
            next_page.addEventListener('click',showPreviousMsg)
        }
        
    }
}


// Cambio Pagina 

function back(){
    --page;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    fetch(BASE_URL + "/chat/show/first/" + first_element[page]).then(onResponse).then(displayChat);
}

function showPreviousMsg(){
    page++;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    fetch(BASE_URL + "/chat/show/last/" + last_element).then(onResponse).then(displayChat);
}


function showCurrentMsg(){
    fetch(BASE_URL + "/chat/show/current/" + first_element[page]).then(onResponse).then(displayChat);
}




function showMessage(){
    fetch(BASE_URL + "/chat/show").then(onResponse).then(displayChat);
}



// Cerca Film

function onJsonSearchMovies(json){

    const section = document.querySelector('#album-view');
    section.innerHTML='';

    document.querySelector('header img.circle').classList.add('hidden');
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
        display.addEventListener('click',showOverview);
        display.classList.add('display-overview');
        div.appendChild(display);
    

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
    

        const box = document.createElement('div');
        box.classList.add('interacts-box');
        div.appendChild(box);

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
    
    searchResultWidth(section,searched_movie,count)

    if(count!==0){
        const close = document.querySelector('#close');
        close.classList.remove('hidden');
        close.addEventListener('click',clearAlbumView);
    }

}


function clearAlbumView(){
    const close = document.querySelector('#close');
    close.classList.add('hidden');
    close.removeEventListener('click',clearAlbumView);
    document.querySelector('#album-view').innerHTML='';
        
}



function searchMoviesRequest(event){
    event.preventDefault();
    const input = document.querySelector('#search');
    searched_movie = input.value;

    document.querySelector('header img.circle').classList.remove('hidden');


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

        const desc = document.createElement('div');
        desc.textContent = "Non hai inserito il nome del film";
        section.appendChild(desc);
        
    }
}

const form_search = document.querySelector('form.search').addEventListener('submit',searchMoviesRequest);


document.querySelector('#search').addEventListener('focus',onFocus);
document.querySelector('#search').addEventListener('blur',onBlur);



function onAddMsgResponse(response){
    page=0;
    showMessage();
    return response.json();
}



// Modifica messaggi

function updateMsg(event){
    event.preventDefault();
    let input= document.querySelector('#input-text').value;
    if(input !== text_msg){
        const formdata = new FormData();
        formdata.append("msg_id", id);
        formdata.append("text", input);
        formdata.append("_token", csrf_token);
        fetch(BASE_URL + "/chat/update" ,
            {method: 'post',body: formdata}
        ).then(onUpdateResponse).then(showCurrentMsg);
    }
    else{
        form_msg.removeEventListener('submit',updateMsg);
    }
    
}

let id;
let text_msg='';

function updateMsgModal(event){

    let element = event.currentTarget;
    form_msg.removeEventListener('submit',addMessage);
    form_msg.addEventListener('submit',updateMsg);

    let h1 = document.querySelector('#modal-view h1');
    h1.textContent = "Modifica il tuo messaggio";

    id = element.parentNode.parentNode.parentNode.querySelector('em').textContent;
    text_msg = element.parentNode.parentNode.parentNode.querySelector('p').textContent;
    let input= document.querySelector('#input-text');
    input.removeEventListener('click',onFocusMsg);
    input.addEventListener('click',onFocusUpdateMsg);
    input.value=text_msg;

    document.body.classList.add('no-scroll');
    modalView.style.top = window.pageYOffset + 'px';
    modalView.classList.remove('hidden');
}


function onFocusUpdateMsg(event){
    event.stopPropagation();
}


function onUpdateResponse(resposne){
    form_msg.removeEventListener('submit',updateMsg);
    return resposne.json();
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
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

function removeMessage(event){
    let element = event.currentTarget;
    let msg_id = element.parentNode.parentNode.parentNode.querySelector('em').textContent;
    fetch(BASE_URL + "/chat/remove/" + encodeURIComponent(msg_id)).then(onResponse).then(showCurrentMsg);
}



let last_msg;
let first_element=[];
let page=0;


function displayChat(json){
    console.log(json);
    const display = document.querySelector('#chat-display');
    display.innerHTML="";
    display.classList.remove('empty-chat')
    if((json.status === false)){
        if(page>0){
            --page;
        showCurrentMsg();
        }
        else{
            const desc = document.createElement('div');
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

            let heading_box = document.createElement('div');
            heading_box.classList.add('heading-box');
            text_side.appendChild(heading_box);

            let user = document.createElement('strong');
            user.textContent = result.username;
            user.classList.add('username-chat')
            heading_box.appendChild(user);


            let date = document.createElement('small');
            date.textContent = result.date;
            if(result.updated === 1){
                date.textContent = date.textContent  + " ✓modificato"; 
            }
            date.classList.add('date');
            heading_box.appendChild(date);

        
            last_msg = result.msg_id;
            if(num_results === 1){
                first_element[page] = result.msg_id;
            }

            let text_container = document.createElement('div');
            heading_box.appendChild(text_container);


            let text_msg = document.createElement('p');
            text_msg.textContent = result.text_msg;
            text_container.appendChild(text_msg);

            
            let msg_id = document.createElement('em');
            msg_id.textContent = result.msg_id;
            msg_id.classList.add('id');
            msg_id.classList.add('hidden');
            text_side.appendChild(msg_id);


            if(result.username === username){
                let update = document.createElement('div');
                update.classList.add('update');
                text_side.appendChild(update);

                let update_msg = document.createElement('div');
                update_msg.classList.add('update-msg');
                update.appendChild(update_msg);

                let pencil = document.createElement('img');
                pencil.addEventListener('click',updateMsgModal);
                pencil.src="./images/pencil-regular-24.png";
                update_msg.appendChild(pencil);

                let remove_msg = document.createElement('div');
                remove_msg.classList.add('remove-msg');
                update.appendChild(remove_msg);

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

            let title_box = document.createElement('div');
            movie_side.appendChild(title_box);

            let title = document.createElement('strong');
            title.textContent = result.title;
            title.classList.add('movie-title')
            title_box.appendChild(title);
            
        }



        const button_container = document.createElement('div');
        button_container.classList.add('button-container');
        display.appendChild(button_container);

        if(page>0){
            let back_button = document.createElement('button');
            back_button.textContent = "<";
            button_container.appendChild(back_button);
            back_button.addEventListener('click',back)
        }
        if((num_results === 10)&&(json.n_res>10)){
            let next_page = document.createElement('button');
            next_page.textContent = ">";
            button_container.appendChild(next_page);
            next_page.addEventListener('click',showPreviousMsg)
        }
        
    }
}

function back(){
    --page;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    fetch(BASE_URL + "/chat/show/" + "first" + "/" + first_element[page]).then(onResponse).then(displayChat);
}

function showPreviousMsg(){
    page++;
    window.scroll({
        top: 250,
        left: 0,
        behavior: 'smooth'
    });
    fetch(BASE_URL + "/chat/show/" + "last" + "/" + last_msg).then(onResponse).then(displayChat);
}


function showCurrentMsg(json){
    console.log(json)
    fetch(BASE_URL + "/chat/show/" + "current" + "/" + first_element[page]).then(onResponse).then(displayChat);
}

function onResponse(resposne){
    form_msg.removeEventListener('submit',updateMsg);
    return resposne.json();
}


function showMessage(){
    fetch(BASE_URL + "/chat/show").then(onResponse).then(displayChat);
}






getUsername();




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
    

    let logout = document.createElement('a');
    logout.textContent = "Logout";
    logout.href="/logout";
    menu.appendChild(logout);
    

    document.querySelector('#menu').removeEventListener('click',onClick1);
    document.querySelector('#menu').addEventListener('click',onClick2);
}


const menu = document.querySelector('#menu').addEventListener('click',onClick1);

function onBlur(event){
    let element = event.currentTarget;
    if(element.value === ""){
        element.value="nome del film";
    }
}

function onFocus(event){
    let element = event.currentTarget;
    if(element.value === "nome del film"){
        element.value="";
    }
}

document.querySelector('#search').addEventListener('focus',onFocus);
document.querySelector('#search').addEventListener('blur',onBlur);


function onJsonSearchMovies(json){
    const section = document.querySelector('#album-view');
    section.innerHTML='';

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

        inc_width =document.querySelector('boxContents');

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
        vote_container.textContent = "Voto: ";
        div.appendChild(vote_container);
        let vote = document.createElement('em');
        vote.classList.add('vote');
        vote.textContent = result.res.vote_average;
        div.appendChild(vote);

        const box = document.createElement('div');
        box.classList.add('interacts-box');
        div.appendChild(box);

        let share = document.createElement('img');
        share.classList.add('share');
        share.addEventListener('click',openModal);
        console.log(result.shared)
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
    const input = event.currentTarget.querySelector('#search');
    searched_movie = input.value;

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




function onAddMsgResponse(response){
    page=0;
    showMessage();
    return response.json();
}



function updateMsg(event){
    event.preventDefault();
    let input= document.querySelector('#input-text').value;
    if(input.length <1200){
            const formdata = new FormData();
            formdata.append("msg_id", id);
            formdata.append("text", input);
            formdata.append("_token", csrf_token);
        
        fetch(BASE_URL + "/chat/update" ,
            {method: 'post',body: formdata}
        ).then(onResponse).then(showCurrentMsg);
    }
    else{
        form_msg.removeEventListener('submit',updateMsg);
    }
}

let id;

function updateMsgModal(event){
    let element = event.currentTarget;
    form_msg.removeEventListener('submit',addMessage);
    form_msg.addEventListener('submit',updateMsg);

    let h1 = document.querySelector('#modal-view h1');
    h1.textContent = "Modifica il tuo messaggio";

    id = element.parentNode.parentNode.parentNode.querySelector('em').textContent;
    let text_msg = element.parentNode.parentNode.parentNode.querySelector('p').textContent;
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

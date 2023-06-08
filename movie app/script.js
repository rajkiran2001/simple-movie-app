const api_url ='https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=252a2673ee943f473fd240beb6f2a945&page=1';

const img_path = 'https://image.tmdb.org/t/p/w1280'
const search_url = 'https://api.themoviedb.org/3/search/movie?api_key=252a2673ee943f473fd240beb6f2a945&query="'

const form = document.getElementById('form');
const search = document.getElementById('search');
const main =document.getElementById('main');



async function getmovies(url){
    const res = await fetch(url);
    const data = await res.json();
    console.log(data.results)
    addtoDOM(data.results);
}

function addtoDOM(results){
    main.innerHTML='';
    
    results.forEach((data) => {
        
    
    const div= document.createElement('div');
    div.className="movie";
    div.innerHTML=`
    <img src=${img_path+data.poster_path}
                alt="">
            <div class="movie-info">
                <h3>${data.title}</h3>
                <span id ="color" class=${changecolor(data.vote_average)}>${data.vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${data.overview}</div>
    `
    
    main.appendChild(div);
});
}

function changecolor(vote){

    if(vote<=5){
        return 'red';
    }
    else if(vote<8 && vote>5){
        return 'orange';
    }
    else{
        return 'green';
    }
}
document.addEventListener('DOMContentLoaded',getmovies(api_url))

form.addEventListener('submit',(e)=>{
    e.preventDefault();

    const searchterm = search.value;
    if(searchterm && searchterm!==''){
        getmovies(search_url + searchterm)
        search.value = '';    }
})
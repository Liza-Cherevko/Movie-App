// const API_KEY =
//     "3c9b7328-f058-4870-850f-8deffd4d6fb3";
const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
"https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=1";
const API_SEARCH =
"https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";

const API_GET_INFO = "https://kinopoiskapiunofficial.tech/api/v2.2/films/8124/videos"

const formEl = document.querySelector('form');
const searchEl = document.querySelector('.header__search');
const modalEl = document.querySelector('.modal');


getMovies(API_URL_POPULAR);

async function getMovies(url) {
    const resp = await fetch(url, {
        headers: {
            "Content-Type": "aplication/json",
            "X-API-KEY": API_KEY,
        },
    });
    const respData = await resp.json();
    console.log(respData)
  showMovies(respData);
}

function showMovies(data) {
    const moviesEl = document.querySelector(".movies");
  
    // Очищаем предыдущие фильмы
    document.querySelector(".movies").innerHTML = "";
  
    data.films.forEach((movie) => {
        console.log(movie)
      const movieEl = document.createElement("div");
      movieEl.classList.add("movie");
      movieEl.innerHTML = `
          <div class="movie__cover-inner">
          <img
            src="${movie.posterUrlPreview}"
            class="movie__cover"
            alt="${movie.nameRu}"
          />
          <div class="movie__cover--darkened"></div>
        </div>
        <div class="movie__info">
          <div class="movie__title">${movie.nameRu}</div>
          <div class="movie__category">${movie.genres.map(
            (genre) => ` ${genre.genre}`
          )}</div>
          ${
            movie.rating &&
            `
          <div class="movie__average movie__average--${getClassByRate(
            movie.rating
          )}">${movie.rating}</div>
          `
          }
        </div>
          `;
        moviesEl.addEventListener('click', ()=> openModal(movie.filmId))
      moviesEl.appendChild(movieEl);
    });
  }
function getClassByRate(data) {
    if (data > 7) {
        return "green"
    } else if (data > 5) {
        return "orange"
    } else {
        return "red"
    }
}

formEl.addEventListener("submit", (e) => {
  e.preventDefault();

  const apiSearchUrl = `${API_SEARCH}${searchEl.value}`;
    if (searchEl.value) {
      
    getMovies(apiSearchUrl);
    searchEl.value = "";
    }

    console.log(searchEl)
});

// modal
async function openModal(id) {
    console.log(id)
    modalEl.classList.add("modal--show")

modalEl.innerHTML = `
<div class="movie__cover-inner">
         <img
         src="${movie.posterUrlPreview}"
         class="movie__cover"
         alt="${movie.nameRu}"
         />
            <div class="movie__cover--darkened"></div>
     </div>
     <div class="movie__info">
     <div class="movie__title">${movie.nameRu}</div>
     <div class="movie__category">${movie.genres.map(
       (genre) => ` ${genre.genre}`
     )}</div>
     ${
       movie.rating &&
       `
     <div class="movie__average movie__average--${getClassByRate(
       movie.rating
     )}">${movie.rating}</div>
     `
     }
   </div>
`
}


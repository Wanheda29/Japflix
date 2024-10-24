document.addEventListener("DOMContentLoaded", ()=>{

    fetch('https://japceibal.github.io/japflix_api/movies-data.json')
        .then(response =>{ return response.json()})
        .then(data => { moviesData = data})
        .catch(error => {console.log("Error cargando datos")});
  
    document.getElementById("btnBuscar").addEventListener("click", searchInput);
});
let moviesData=[];

function showMovies(movies){
    let movieInfo = "";
    movies.forEach(movie => {
        movieInfo += `
            <li class="align-items-start button list-group-item cursor-active d-flex justify-content-between" onclick="offcanvas(${movie.id})" data-bs-toggle="offcanvas" data-bs-target="#offcanvasTop" aria-controls="offcanvasTop">
            <div class="ms-2 me-auto">
              <div  class="fw-bold">${movie.title}</div>
              <p id="tagline" class="fw-lighter">${movie.tagline}</p>
            </div>`;
               for(i=1; i<=5 ; i++){
                if(Math.round(movie.vote_average/2)<=i){
                    movieInfo += `<div class="stars">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-star-fill" viewBox="0 0 16 16">
        <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z"/>
      </svg>
    </div>
        `;
                }
            }

        movieInfo +=`</li>`;
        document.getElementById("lista").innerHTML = movieInfo;
    });
}

function searchInput(){
    let search = document.getElementById("inputBuscar").value.toLowerCase();
    let movies = [];
    if(search != ''){
        movies = moviesData.filter((movie) => 
            movie.title.toLowerCase().includes(search) || movie.tagline.toLowerCase().includes(search) || movie.overview.toLowerCase().includes(search) || movie.genres.some( genre => genre.name.toLowerCase().includes(search))
        );
    }
    showMovies(movies);
}

function offcanvas(movieId){
    let getMovie = moviesData.find((getMovie) => getMovie.id == movieId);
    let genres= getMovie.genres.map(genre => genre.name);
    document.getElementById("offcanvas-MovieGenre").innerHTML = genres.join(" - ");
    document.getElementById("movie-information").innerHTML = getMovie.overview;
    document.getElementById("offcanvas-MovieTitle").innerHTML = getMovie.title;
    // Boton More
    document.getElementsByClassName("dropdown-menu")[0].innerHTML = `
              <li><a class="dropdown-item"><p>Year:</p><p>${getMovie.release_date.split("-")[0]}</p></a></li>
              <li><a class="dropdown-item"><p>Runtime:</p><p>${getMovie.runtime} mins</p></a></li>
              <li><a class="dropdown-item"><p>Budget:</p><p>$${getMovie.budget}</p></a></li>
              <li><a class="dropdown-item"><p>Revenue:</p><p>$${getMovie.revenue}</p></a></li>
    `;

    console.log(getMovie)
}
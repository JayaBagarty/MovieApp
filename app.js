const key = "3ae557dd";
var searchInput = document.getElementById("Input");
var displaySearchList = document.getElementsByClassName(".showdetails");

fetch("http://www.omdbapi.com/?i=tt3896198&apikey=3ae557dd")
  .then((res) => res.json())
  .then((data) => console.log(data));

searchInput.addEventListener("input", findMovies);

async function singleMovie() {
  var urlQueryParams = new URLSearchParams(window.location.search);
  var id = urlQueryParams.get("id");
  const url = `https://www.omdbapi.com/?i=${id}&apikey=${key}`;
  const res = await fetch(`${url}`);
  const data = await res.json();

  var output = `

    <div class="movie-poster">
        <img src=${data.Poster} alt="Movie Poster">
    </div>
    <div class="movie-details">
        <div class="details-header">
            <div class="dh-ls">
                <h2>${data.Title}</h2>
            </div>
        </div>
        <span class="italics-text"><i>${data.Year} &#x2022; ${data.Country} &#x2022; Rating - <span
                    style="font-size: 18px; font-weight: 600;">${data.imdbRating}</span>/10 </i></span>
        <ul class="details-ul">
            <li><strong>Actors: </strong>${data.Actors}</li>
            <li><strong>Director: </strong>${data.Director}</li>
            <li><strong>Writers: </strong>${data.Writer}</li>
        </ul>
        <ul class="details-ul">
            <li><strong>Genre: </strong>${data.Genre}</li>
            <li><strong>Release Date: </strong>${data.Released}</li>
            <li><strong>Box Office: </strong>${data.BoxOffice}</li>
            <li><strong>Movie Runtime: </strong>${data.Runtime}</li>
        </ul>
        <p style="font-size: 14px; margin-top:10px;">${data.Plot}</p>
    </div> 
    `;
  document.querySelector(".movie-container").innerHTML = output;
}

async function findMovies() {
  const url = `https://www.omdbapi.com/?s=${searchInput.value.trim()}&page=1&apikey=${key}`;
  const res = await fetch(`${url}`);
  const data = await res.json();
  if (data.Search) {
    displayMovieList(data.Search);
  }
}
async function displayMovieList(movies) {
  var output = "";
  for (i of movies) {
    var img = "";
    if (i.Poster != "N/A") {
      img = i.Poster;
    } else {
      img = "img/blank-poster.webp";
    }
    var id = i.imdbID;

    output += `

        <div class="fav-item">
            <div class="fav-poster">
            <a href="movieDetails.html?id=${id}"><img src=${img} alt="Favourites Poster"></a>
            </div>
            <div class="fav-details">
                <div class="fav-details-box">
                    <div>
                        <p class="fav-movie-name"><a href="movie.html?id=${id}">${i.Title}</a></p>
                        <p class="fav-movie-rating"><a href="movie.html?id=${id}">${i.Year}</a></p>
                    </div>
                </div>
            </div>
        </div>

       `;
  }
  document.querySelector(".showdetails").innerHTML = output;
}

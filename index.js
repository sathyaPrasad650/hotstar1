let displayDiv = document.querySelector('#displayDiv')

////  url from --> https://www.omdbapi.com/

//// default fetch
const url = 'https://www.omdbapi.com/?i=tt3896198&apikey=983f5710'

fetch(url).then(function (result1) {
    // console.log(result1)
    return result1.json()
}).then(function (result2) {
    // displayMovie(result2)
    // console.log(result2)
}).catch(function (err) {
    console.log(err);
})

//// fetching according to the search result
function searchMovie() {
    let movieName = document.querySelector('#input').value;
    const url = `https://www.omdbapi.com/?t=${movieName}&apikey=983f5710`

    fetch(url).then(function (result1) {
        // console.log(result1)
        return result1.json()
    }).then(function (result2) {
        // console.log(result2)
        let length = Object.keys(result2).length
        if (length > 2) {
            displayMovie(result2)
        }
        else {
            displayDiv.innerHTML = null
            let err = document.createElement('img')
            err.src = "https://i.pinimg.com/originals/11/dc/96/11dc96d2e4daca3ea8ff6aa41299b5e1.gif"
            displayDiv.append(err)
        }
    }).catch(function (err) {
        console.log(err)
    })
}

function displayMovie(obj) {
    displayDiv.innerHTML = null

    // div to store all the details on the movie
    let searchedMovie = document.createElement("div");
    searchedMovie.setAttribute("id", "searchedMovie");

    let poster = document.createElement('img');
    poster.src = obj.Poster
    poster.style.width = '100%'

    let posterDiv = document.createElement('div')
    posterDiv.style.width = "30%"
    posterDiv.append(poster)

    let movieData = document.createElement('div');
    movieData.setAttribute('id', 'movieData')

    let title = document.createElement('p')
    title.innerText = `Title: ${obj.Title}`

    let releaseDate = document.createElement('p')
    releaseDate.innerText = `Release Date: ${obj.Released}`

    let rating
    // console.log(obj.imdbRating)
    if (obj.imdbRating > 8.5) {
        // console.log('YESSSS')
        rating = document.createElement('p')
        rating.innerText = `(RECOMMENDED) Imdb Rating: ${obj.imdbRating}`
    }
    else {
        rating = document.createElement('p')
        rating.innerText = `Imdb Rating: ${obj.imdbRating}`
    }

    let cast = document.createElement('p')
    cast.innerText = `Cast: ${obj.Actors}`

    let duration = document.createElement('p')
    duration.innerText = `Duration: ${obj.Runtime}`

    let language = document.createElement('p')
    language.innerText = `Language: ${obj.Language}`

    let plot = document.createElement('p')
    plot.innerText = `Plot: ${obj.Plot}`

    let director = document.createElement('p')
    director.innerText = `Director: ${obj.Director}`

    movieData.append(title, releaseDate, rating, director, cast, duration, language, plot)
    searchedMovie.append(posterDiv, movieData)
    displayDiv.append(searchedMovie)
}

// Closures

// steps
// 1.accept the input
// 2.fetch the data
// 3.append the data

// debounce
let id;
function debounceFunction(func, delay) {
    if (id) {
        clearInterval(id);
    }

    id = setTimeout(function () {
        // func() referring to the main function
        func();
    }, delay);
}

// main();
async function main() {
    let query = document.querySelector("#query").value;
    // console.log(query);
    // let query = "avengers";

    let response = searchMovies(query);

    let data = await response;
    console.log(data);

    appendMovies(data);
}

// fetching the url
async function searchMovies(query) {
    //url from --> omdbapi.com

    // default url -> http://www.omdbapi.com/?i=tt3896198&apikey=983f5710

    // SearchResult-url -> http://www.omdbapi.com/?s=avengers&apikey=983f5710

    let url = `https://www.omdbapi.com/?s=${query}&apikey=983f5710`;

    try {
        let res = await fetch(url);
        // console.log(res);

        let data = await res.json();
        //   console.log(data.Search);
        return data.Search;
    } catch (error) {
        console.log(error);
    }
}

let movies_div = document.querySelector("#movies");

// appending the data
function appendMovies(movies) {
    movies_div.innerHTML = null;

    if (movies == undefined) {
        return false;
    }

    movies.forEach(function (el, index) {
        let box = document.createElement('div')
        box.setAttribute('class','box')
        box.innerHTML = `<div class="boxImgDiv"><img src="${el.Poster}" alt="" class="boxImg"></div>
                        <div class="boxP"><p>${el.Title}</p></div>`
        box.addEventListener('click',function(){
            // console.log('box-click')
            // console.log(el.Title)
            // console.log(el.Poster)
            // console.log(el)
            // displayMovie(el)
        })

        movies_div.append(box)
    });
}




var container = document.querySelector(".contain");

var query = document.querySelector("#query");
query.addEventListener("click", queryFn);

function queryFn() {
    //     console.log('s')
    container.classList.toggle("contain-height");
}
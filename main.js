let $movies = document.querySelector("#container-movies");
let $form = document.querySelector("#form");
let movies;
let array;
let property;

getData();

async function getData() {
    await fetch("https://ghibliapi.herokuapp.com/films")
    .then(res => res.json())
    .then(datos => {
    movies = datos;
    array = Array.from(movies);
    printMovies(movies);
  }
    )
    .catch(error => console.log("Este es el error => " + error));
    printBySelection($form);
    
}



function printBySelection(element) {
element.addEventListener("change", (event) => {
    property = `${event.target.id}`;
    console.log(property);
    let sorted = orderBy(property, array);
    console.log(sorted);
    printMovies(sorted);
})
}

function printMovies(data) {
    $movies.innerHTML = "";
data.forEach(movie => {
    $movies.innerHTML += `<div class="card mb-3 ms-2 me-2" style="width: 18rem;">
    <img src="${movie.image}" class="card-img-top" alt="...">
    <div class="card-body">
      <h5 class="card-title">${movie.title}</h5>
      <p class="card-text">${movie.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`
})
}

function orderBy(prop,data) {
    let sorted = data.sort((a,b) => a[prop] > b[prop]? 1: a[prop] < b[prop]? -1 : 0);
    return sorted;
}
let $movies = document.querySelector("#container-movies");
let $form = document.querySelector("#form");
let searchs = document.querySelector("#search");
let listMovies = document.querySelector("#list-movies");
let movies;
let array;
let property;
let searched;
let filtered = [];

let titles;
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
  getTitles(movies);
  search();
}


function makeListWithMatches() {
  listMovies.innerHTML = "";
  console.log(searched)
  titles.forEach(movie => {
    if (movie.includes(searched)) {
      let li = document.createElement("li");
      li.innerHTML = '<a class="dropdown-item" href="#">' + movie + '</a>';
      listMovies.append(li);
    }


  })
}

function search() {
  searchs.addEventListener("keyup", (event) => {
    searched = event.target.value;
    makeListWithMatches();
    filterMovies()
    console.log(filtered)
    printMovies(filtered);
  })

}

function filterMovies() {
  filtered = movies.map(ele => {
    if(ele.title.includes(searched)) {
      return ele;
    }
  } )
}

function getTitles(data) {
  titles = data.map(movie => (movie.title).toLowerCase());
  console.log(titles);
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
      <p class="card-text">${movie.release_date}</p>
      <p class="card-text">${movie.description}</p>
      <a href="#" class="btn btn-primary">Go somewhere</a>
    </div>
  </div>`
  })
}

function orderBy(prop, data) {
  let sorted = data.sort((a, b) => a[prop] > b[prop] ? 1 : a[prop] < b[prop] ? -1 : 0);
  return sorted;
}
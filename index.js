function openMenu() {
  document.body.classList += " menu--open"
}

function closeMenu() {
  document.body.classList.remove('menu--open')
}

const inputElement = document.querySelector("#searchInput")
const formElement = document.querySelector("form")
const resultsElement = document.querySelector(".searchResults")
const filterElement = document.querySelector("#filter")
let button = document.querySelector(".btn")

formElement.addEventListener("submit", async (event) => {
    event.preventDefault()
    button.innerHTML = `<i class="fas fa-spinner searchResults__loading--spinner"></i>`
    button.disabled = true
    filterElement.style = "visibility: hidden; margin-top: 0"

    resultsElement.innerHTML = ""
    const inputValue = inputElement.value
    
    const response = await fetch(`http://www.omdbapi.com/?i=tt3896198&apikey=abb25aee&s=${inputValue}`)
    const data = await response.json()

    setTimeout(() => {
      button.innerHTML = `<i class="fas fa-magnifying-glass"></i>`
      button.disabled = false

      filterElement.style = "visibility: visible; margin-top: 48px"
      filterElement.value = "reset"
      resultsElement.style = "margin-top: 48px"

      let movies = data.Search.slice(0, 9).filter(movie => movie.Type === "movie")

      movies.forEach(movie => {
        resultsElement.innerHTML +=
          `<div class="movie">
            <figure class="movie__img--wrapper">
              <img src="${movie.Poster}" onerror="this.onerror=null; this.src='./assets/fallback image.png'" class="movie__img"/>
            </figure>
            <h2 class="movie__title">${movie.Title}</h2>
            <p>${movie.Year}</p>
          </div>`
        })

      filterElement.addEventListener("change", (event) => {
        const selection = event.target.value

        if (selection === "OLD_TO_NEW") {
          resultsElement.innerHTML = ""
          movies.sort((a, b) => a.Year - b.Year)
          movies.forEach(movie => {
            resultsElement.innerHTML +=
              `<div class="movie">
                <figure class="movie__img--wrapper">
                  <img src="${movie.Poster}" onerror="this.onerror=null; this.src='./assets/fallback image.png'" class="movie__img"/>
                </figure>
                <h2 class="movie__title">${movie.Title}</h2>
                <p>${movie.Year}</p>
              </div>`
          })
        }
          
        else if (selection === "NEW_TO_OLD") {
          resultsElement.innerHTML = ""
          movies.sort((a, b) => b.Year - a.Year)
          movies.forEach(movie => {
            resultsElement.innerHTML +=
              `<div class="movie">
                <figure class="movie__img--wrapper">
                  <img src="${movie.Poster}" onerror="this.onerror=null; this.src='./assets/fallback image.png'" class="movie__img"/>
                </figure>
                <h2 class="movie__title">${movie.Title}</h2>
                <p>${movie.Year}</p>
              </div>`
          })
        }
      })
    }, 1000)

    if(data.Response === "False") {
      setTimeout(() => {
        button.innerHTML = `<i class="fas fa-magnifying-glass"></i>`
        button.disabled = false
        filterElement.style = "visibility: hidden; margin-top: 0"
        resultsElement.style = "margin-top: 0"
        resultsElement.innerHTML = `<h2 class="no-result">No results found</h2>`
      }, 1000)
    }
})

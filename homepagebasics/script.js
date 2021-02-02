


$(document).ready(function(){

   $("#submitButton").click(function (event) {
       event.preventDefault(event)
       var searchedMovie = $("#searchMovie").val()
       getMovieData(searchedMovie)
   })

})


function getMovieData(searchedMovie) {
 
    var baseURL = "https://api.themoviedb.org/3/search/movie?api_key="
    var apiKey = "a5db0bdde47c11be5caeeea00fac18c3"
    var movieQuery = "&query="+searchedMovie
    var completeUrl = baseURL + apiKey + movieQuery

    fetch(completeUrl)  
    .then(function(response) {
      if (response.ok) {
        response.json()
        .then (function(data) {
          console.log(data.results[0].title);
          console.log(data)
        })
        }     
})
}
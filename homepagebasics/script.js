


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

    //fetch function to retrieve movie data from MMDB
    fetch(completeUrl)  
    .then(function(response) {
      if (response.ok) {
        response.json()
        .then (function(data) {
          console.log(data.results[0].title);
          console.log(data)

          displayMovies (data, searchedMovie)

        })
        } else {
          //placeholder alert, will replace with on page error message later
          alert("No data found")
        }   
})

var displayMovies = function (data, searchedMovie){
  console.log(searchedMovie)

  for (i=0; i<6; i++) {
    var movieName = $("<h2>");
    var movieDate = $("<h3>");
    var movieSynopsis = $("<p>");
    var moviePoster = $("<img>");
    var movieRating = $("<p>");

    movieName.text(data.results[i].title)

    movieDate.text((data.results[i].release_date).substring(0,4))

    movieSynopsis.text(data.results[i].overview);

    posterId = data.results[i].poster_path
    moviePoster.attr("src", "https://image.tmdb.org/t/p/w154"+ posterId)

    movieRating.text("Rating: " + data.results[i].vote_average)
 
    //dynamically create the card/panel to hold results
    var movieInfo = $("<div>").addClass("w3-panel w3-black w3-border")
    var posterColumn = $("<div>").addClass("w3-col l4 w3-center")
    var infoColumn = $("<div>").addClass("w3-col l8")
    var posterCard = $("<div>").addClass("w3-card w3-white w3-padding w3-margin w3-center")
    var infoCard = $("<div>").addClass("w3-card w3-white w3-padding-small w3-margin")
    
    
    posterCard.append(moviePoster)
    infoCard.append(movieName, movieDate, movieRating, movieSynopsis)

    posterColumn.append(posterCard)
    infoColumn.append(infoCard)
    movieInfo.append(posterColumn, infoColumn)

    $("#generatedResults").append(movieInfo)
  }


}




}
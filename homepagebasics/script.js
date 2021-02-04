
$(document).ready(function(){
//click event for 'search by movie' button
   $("#movieSubmit").click(function (event) {
       event.preventDefault(event)
       var searchedMovie = $("#searchMovie").val()
       getMovieData(searchedMovie)
   })
//click event for 'search by actor' button
   $("#actorSubmit").click(function (event) {
     event.preventDefault(event)
     var searchedActor = $("#searchActor").val()
     getActorData(searchedActor)
   })
   //click event for 'search by genre and year' button
   $("#genreSubmit").click(function (event) {
    event.preventDefault(event)
    //used genre id as 'value' in html so can search using that
    var searchedgenre = $("#genreDropDown").val()

    var searchedyear = $("#searchYear").val()
    //function to generate movie data by genre and/or year
    getGenreYearData(searchedgenre, searchedyear)
  })

})

//function to retrieve movie data from 'search by movie' button
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
          $("#generatedResults").empty()
          displayMovies (data, searchedMovie)

        })
        } else {
          //placeholder alert, will replace with on page error message later
          alert("No data found")
        }   
})

//function to display movie data on the page within dynamically created elements
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

//function to retrieve movie data from 'search by actor' button
function getActorData(searchedActor) {

  var baseURL = "https://api.themoviedb.org/3/search/person?api_key="
  var apiKey = "a5db0bdde47c11be5caeeea00fac18c3"
  var movieQuery = "&query="+searchedActor
  var completeUrl = baseURL + apiKey + movieQuery

  //fetch function to retrieve data from MMDB
  fetch(completeUrl)  
  .then(function(response) {
    if (response.ok) {
      response.json()
      .then (function(data) {
        console.log(data.results[0].id);
        console.log(data)
        movieCredits(data)
      })
      } else {
        //placeholder alert, will replace with on page error message later
        alert("No data found")
      }   
})
 
//create another fetch function to get movies data based on actor ID that we got from getActorData function
var movieCredits = function (data) {
  var actorID = data.results[0].id
  var newUrl = "https://api.themoviedb.org/3/person/" + actorID + "/movie_credits?api_key=a5db0bdde47c11be5caeeea00fac18c3&language=en-US"
  fetch(newUrl)  
  .then(function(response) {
    if (response.ok) {
      response.json()
      .then (function (data) {
        $("#generatedResults").empty()
        displayActor(data)
        }) 
      }
})
}

//function to display movie data with the specified actor on the webpage
function displayActor (data) {
            console.log(data)
            for (i=0; i<6; i++) {
              var movieName = $("<h2>");
              var movieDate = $("<h3>");
              var movieSynopsis = $("<p>");
              var moviePoster = $("<img>");
              var movieRating = $("<p>");
            
              movieName.text(data.cast[i].title)
            
              movieDate.text((data.cast[i].release_date).substring(0,4))
            
              movieSynopsis.text(data.cast[i].overview);
            
              posterId = data.cast[i].poster_path
              moviePoster.attr("src", "https://image.tmdb.org/t/p/w154"+ posterId)
            
              movieRating.text("Rating: " + data.cast[i].vote_average)
            
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




//function to retrieve movie data from 'search by genre and year' button
function getGenreYearData (searchedgenre, searchedyear) {
 
  var baseURL = "https://api.themoviedb.org/3/discover/movie?api_key="
  var apiKey = "a5db0bdde47c11be5caeeea00fac18c3"
  var genreQuery = "&with_genres="+searchedgenre
  var yearQuery = "&primary_release_year="+ searchedyear
  console.log(searchedyear)
  console.log(searchedgenre)
  //if statement to check if genre or year or both options have been chosen
  if (searchedgenre != null && searchedyear !== "") {
   var completeUrl = baseURL + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false" + genreQuery + yearQuery
  } else if (searchedgenre != null && searchedyear === "") {
    var completeUrl = baseURL + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false" + genreQuery
  } else if (searchedgenre == null && searchedyear !== "") {
    var completeUrl = baseURL + apiKey + "&language=en-US&sort_by=popularity.desc&include_adult=false" + yearQuery
  }


  //fetch function to retrieve movie data from MMDB
  fetch(completeUrl)  
  .then(function(response) {
    if (response.ok) {
      response.json()
      .then (function(data) {
        console.log(data)
        $("#generatedResults").empty()
        displayGenreYear(data)
      })
      } else {
        //placeholder alert, will replace with on page error message later
        alert("No data found")
      }   
})

var displayGenreYear = function (data){

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
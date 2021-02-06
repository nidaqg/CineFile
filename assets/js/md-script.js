$(document).ready(function () {

    //get movie info from local storage/api
    let data = JSON.parse(localStorage.getItem("movieClicked"));
    console.log(data);
    posterPath = data.poster_path;
    summary = data.overview;
    movieName = data.title;
    movieYear = (data.release_date).substring(0, 4);
    movieRating= data.vote_average;
    posterUrl = "https://image.tmdb.org/t/p/w154" + posterPath;
    videoSearch(movieName);

    //display elements dynamically
    $("#poster").attr("src", posterUrl);
    $("#synopsis").text(summary);
    $("#movie-title").text(movieName);
    $("#year").text(movieYear);
    $("#rating").text("Rating: "+movieRating+"/10");

    //checking to see if movie is already in watch list, then disable button so it cant be added twice
    if (localStorage.getItem("watchList") != null) {
        let watchListCheck = JSON.parse(localStorage.getItem("watchList"));
        for (i = 0; i < watchListCheck.length; i++) {
            if (watchListCheck[i].title === data.title) {
                $("#addToWatch").text("Added to watchlist");
                $("#addToWatch").removeClass("w3-black").addClass("w3-green");
                $("#addToWatch").prop("disabled", true);
            }
        }
    }

    //checking to see if movie is already in movies seen list, then disable button so it cant be added twice
    if (localStorage.getItem("moviesSeen") != null) {
        let moviesSeenCheck = JSON.parse(localStorage.getItem("moviesSeen"));
        for (i = 0; i < moviesSeenCheck.length; i++) {
            if (moviesSeenCheck[i].title === data.title) {
                $("#markAsSeen").text("Marked as seen");
                $("#markAsSeen").removeClass("w3-black").addClass("w3-green");
                $("#markAsSeen").prop("disabled", true);
            }
        }
    }

    //click event for add to wactchlist button
    $("#addToWatch").click(function () {
        if (localStorage.getItem("watchList") != null) {
            let existing = JSON.parse(localStorage.getItem("watchList"));
            existing.push(data);
            console.log(existing);
            localStorage.setItem("watchList", JSON.stringify(existing));
        }
        else {
            let watchArray = [];
            watchArray.push(data);
            localStorage.setItem("watchList", JSON.stringify(watchArray));
        }
        $("#addToWatch").text("Added to watchlist");
        $("#addToWatch").removeClass("w3-black").addClass("w3-green");
        $("#addToWatch").prop("disabled", true);
    });

    //click event for mark as seen button
    $("#markAsSeen").click(function () {
        if (localStorage.getItem("moviesSeen") != null) {
            let existing = JSON.parse(localStorage.getItem("moviesSeen"));
            existing.push(data);
            console.log(existing);
            localStorage.setItem("moviesSeen", JSON.stringify(existing));
        }
        else {
            let seenArray = [];
            seenArray.push(data);
            localStorage.setItem("moviesSeen", JSON.stringify(seenArray));
        }
        $("#markAsSeen").text("Marked as seen");
        $("#markAsSeen").removeClass("w3-black").addClass("w3-green");
        $("#markAsSeen").prop("disabled", true);
    });

    function videoSearch(movieName) {

    //youtube api variables
    var YOUTUBE_API_KEY = "AIzaSyDWRD2C1LDceUrtIs4HrOwEiOCPBegSyUs";
    var video = '';
    var MovieTitle = movieName
    var maxResults = "1";
    var player1 = '<iframe width="560" height="315" src="https://www.youtube.com/embed/';
    var player2 = '" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';

  
        fetch("https://www.googleapis.com/youtube/v3/search?&key=" + YOUTUBE_API_KEY + "&type=video&maxResults=" + maxResults + "&q=" + MovieTitle + " trailer")

            .then(Response => Response.json())
            .then(data => {
                var videoId = data['items'][0]['id']['videoId'];
                console.log("video id: " + videoId);
                console.log(data);
                video = player1 + videoId + player2;
                $("#trailer-video").append(video);
            })

    }


})
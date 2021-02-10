$(document).ready(function () {

    //get movie info from local storage/api
    let data = JSON.parse(localStorage.getItem("movieClicked"));
    console.log(data);
    posterPath = data.poster_path;
    summary = data.overview;
    movieName = data.title;
    if (data.release_date != undefined) {
        movieYear = (data.release_date).substring(0, 4);
    }
    else {
        movieYear = "No release date";
    }
    movieRating = data.vote_average;
    posterUrl = "https://image.tmdb.org/t/p/w154" + posterPath;
    console.log(movieName);
    videoSearch(movieName);


    //display elements dynamically

    $("#poster").attr("src", posterUrl);
    $("#synopsis").text(summary);
    $("#movie-title").text(movieName);
    $("#year").text("Release year: " + movieYear);
    $("#rating").text("Rating: " + movieRating + "/10");

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

        //imdb api key
        var API_KEY = "k_xn7hh46n";
        var video = '';
        // get movie name from json data
        var VideoTitle = movieName
        // player options
        var player1 = '<iframe width="560" height="315" src="'
        var player2 = '" frameborder="0" autoplay; allowfullscreen></iframe'

        // search IMDB api to get the video ID code from IMDB. 
        fetch("https://imdb-api.com/API/Search/" + API_KEY + "/" + VideoTitle)


            .then(Response => Response.json())
            .then(data => {
                var ttID = data['results'][0]['id'];
                console.log("id: " + ttID);


                // pass imdb ID code to imdb-api trailer
                fetch("https://imdb-api.com/API/YouTubeTrailer/" + API_KEY + "/" + ttID)
                    .then(Response => Response.json())
                    .then(data => {
                        var youtubeLink = data['videoUrl']
                        console.log("youtube link:" + youtubeLink);
                        var youtubeLink = youtubeLink.replace("watch?v=", "embed/");
                        console.log("replaced youtube:" + youtubeLink)
                        video = player1 + youtubeLink + player2;
                        console.log("video link: " + video);
                        $("#trailer-video").append(video);
                    })
                    .catch(error => console.log(error));
            })


    }

})
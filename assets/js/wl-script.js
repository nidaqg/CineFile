let watchList = JSON.parse(localStorage.getItem("watchList"));
let moviesSeen = JSON.parse(localStorage.getItem("moviesSeen"));
populateWatch();
populateSeen();

//populate watch list dynamically
function populateWatch() {
    
    if (watchList != null) {
        for (i = 0; i < watchList.length; i++) {
            let posterPath = watchList[i].poster_path;
            let summary = watchList[i].overview;
            let movieName = watchList[i].title;
            let movieYear = (watchList[i].release_date).substring(0, 4);
            let movieRating = watchList[i].vote_average;
            let posterUrl = "https://image.tmdb.org/t/p/w154" + posterPath;

            var movieNameDiv = $("<h2>");
            var movieDateDiv = $("<h3>");
            var movieSynopsisDiv = $("<p>");
            var moviePosterDiv = $("<img>");
            var movieRatingDiv = $("<p>");

            movieNameDiv.text(movieName)
            movieDateDiv.text(movieYear)
            movieSynopsisDiv.text(summary);
            moviePosterDiv.attr("src", posterUrl)

            movieRatingDiv.text("Rating: " + movieRating)

            //dynamically create the card/panel to hold results
            var movieInfo = $("<div>").addClass("w3-panel w3-black w3-border")
            movieInfo.val(i);
            var posterColumn = $("<div>").addClass("w3-col l4 w3-center")
            var infoColumn = $("<div>").addClass("w3-col l8")
            var posterCard = $("<div>").addClass("w3-card w3-white w3-padding w3-margin w3-center")
            var infoCard = $("<div>").addClass("w3-card w3-white w3-padding-small w3-margin")
            var removeBtn = $("<button>").addClass("w3-button w3-red w3-round-xlarge remove").text("Remove from watchlist");
            var markSeenBtn = $("<button>").addClass("w3-button w3-green w3-round-xlarge seen").text("Mark as seen");
            markSeenBtn.val(i);
            removeBtn.val(i);

            posterCard.append(moviePosterDiv)
            infoCard.append(movieNameDiv, movieDateDiv, movieRatingDiv, movieSynopsisDiv)

            posterColumn.append(posterCard)
            infoColumn.append(infoCard)
            movieInfo.append(posterColumn, infoColumn)

            $("#watchListResults").append(movieInfo)
            $("#watchListResults").append(removeBtn, markSeenBtn);

        }
    }
    //fill results with message if nothing in watchlist
    else {
        var noResults = $("<h3>").addClass("w3-text-white w3-center");
        noResults.text("You have nothing in your watchlist");
        $("#watchListResults").append(noResults);
    }
    //click function for mark as seen button
    $(".seen").click(function () {
        let btnValue = this.value;
        console.log(btnValue);

        //add item to movies seen
        if (moviesSeen != null) {
            let existing = JSON.parse(localStorage.getItem("moviesSeen"));
            existing.push(watchList[btnValue]);
            console.log(existing);
            localStorage.setItem("moviesSeen", JSON.stringify(existing));
        }
        else {
            let seenArray = [];
            seenArray.push(watchList[btnValue]);
            localStorage.setItem("moviesSeen", JSON.stringify(seenArray));
        }
        //remove item from watchlist
        watchList.splice(btnValue, 1);
        localStorage.setItem("watchList", JSON.stringify(watchList));

        //repopulate lists
        $("#moviesSeenResults").empty();
        $("#watchListResults").empty();
        populateWatch();
        populateSeen();

    });

    $(".remove").click(function () {

        //remove from watch list
        let btnValue = this.value;
        watchList.splice(btnValue, 1);
        localStorage.setItem("watchList", JSON.stringify(watchList));

        //repopulate list
        $("#watchListResults").empty();
        populateWatch();
    });
}


//populate movies seen list
function populateSeen() {
    let existingSeen= JSON.parse(localStorage.getItem("moviesSeen"));
    if (existingSeen != null) {
        for (i = 0; i < existingSeen.length; i++) {
            console.log("run "+i)
            //dynamically create the card/panel to hold results
            let movieName = existingSeen[i].title;
            let movieYear = (existingSeen[i].release_date).substring(0, 4);
            let movieNameDiv = $("<h4>").addClass("w3-text-white");
            movieNameDiv.text(movieName + " (" + movieYear + ")");
            $("#moviesSeenResults").append(movieNameDiv);
        }
    }
}


//click event for movie details
$(".w3-panel").click(function () {
    let selected = this.value;
    console.log(selected);
    localStorage.setItem("movieClicked", JSON.stringify(watchList[selected]))
    window.location.href = "movie-detail.html";
});


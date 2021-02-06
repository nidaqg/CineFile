$(document).ready(function () {

    //get movie info from local storage/api
    let data = JSON.parse(localStorage.getItem("movieClicked"));
    console.log(data);
    posterPath=data.poster_path;
    summary=data.overview;
    movieName=data.title;
    movieYear=(data.release_date).substring(0, 4);
    posterUrl= "https://image.tmdb.org/t/p/w154"+posterPath;

    //display elements dynamically
    $("#poster").attr("src", posterUrl);
    $("#synopsis").text(summary);
    $("#movie-title").text(movieName);
    $("#year").text(movieYear);

    //click event for add to wactchlist button
    $("#addToWatch").click(function(){
        if(localStorage.getItem("watchList")!=null){
            let existing= JSON.parse(localStorage.getItem("watchList"));
            existing.push(data);
            console.log(existing);
            localStorage.setItem("watchList", JSON.stringify(existing));
        }
        else{
            let watchArray=[];
            watchArray.push(data);
            localStorage.setItem("watchList", JSON.stringify(watchArray));
        }
        $("#addToWatch").text("Added to watchlist");
        $("#addToWatch").removeClass("w3-black").addClass("w3-green");
        $("#addToWatch").prop("disabled", true);
    });

    //click event for mark as seen button
    $("#markAsSeen").click(function(){
        if(localStorage.getItem("moviesSeen")!=null){
            let existing= JSON.parse(localStorage.getItem("moviesSeen"));
            existing.push(data);
            console.log(existing);
            localStorage.setItem("moviesSeen", JSON.stringify(existing));
        }
        else{
            let seenArray=[];
            seenArray.push(data);
            localStorage.setItem("moviesSeen", JSON.stringify(seenArray));
        }
        $("#markAsSeen").text("Marked as seen");
        $("#markAsSeen").removeClass("w3-black").addClass("w3-green");
        $("#markAsSeen").prop("disabled", true);
    });


})
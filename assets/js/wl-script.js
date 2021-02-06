let watchList = JSON.parse(localStorage.getItem("watchList"));
let moviesSeen = JSON.parse(localStorage.getItem("moviesSeen"));


for (i = 0; i < watchList.length; i++) {
    posterPath = wactchList[i].poster_path;
    summary = watchList[i].overview;
    movieName = watchList[i].title;
    movieYear = (watchList[i].release_date).substring(0, 4);
    movieRating = watchList[i].vote_average;
    posterUrl = "https://image.tmdb.org/t/p/w154" + posterPath;
}

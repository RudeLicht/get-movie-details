const searchBtn = document.getElementById('searchBtn');
const movieHeader = document.getElementById('movies');
const tvHeader = document.getElementById('tv');
const searchInput = document.getElementById('searchInput');

function toggleActiveHeader(activeHeader, inactiveHeader) {
    activeHeader.classList.add('active');
    inactiveHeader.classList.remove('active');
}

movieHeader.addEventListener('click', function () {
    toggleActiveHeader(movieHeader, tvHeader);
    searchBtn.classList.add('searchMovie');
    searchBtn.classList.remove('searchTV');
    searchInput.value = "";
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = "";
});

tvHeader.addEventListener('click', function () {
    toggleActiveHeader(tvHeader, movieHeader);
    searchBtn.classList.add('searchTV');
    searchBtn.classList.remove('searchMovie');
    searchInput.value = "";
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = "";
});

toggleActiveHeader(movieHeader, tvHeader);

searchBtn.addEventListener('click', search);
searchInput.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        search();
    }
});

function search() {
    const searchInputValue = searchInput.value;
    const attName = searchBtn.getAttribute('class');
    if (attName === "searchTV") {
        fetchTVShow(searchInputValue);
    } else {
        fetchMovies(searchInputValue);
    }
}

async function fetchMovies(name) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}` // Use environment variable here
        }
    };

    try {
        const data = await fetch(`https://api.themoviedb.org/3/search/movie?query=${name}`, options);
        const response = await data.json();

        const resultsContainer = document.getElementById('results');
        resultsContainer.setAttribute('class', 'resultContainer');
        resultsContainer.innerHTML = "";

        for (let i = 0; i < response.results.length; i++) {
            const movieContainer = document.createElement('div');
            movieContainer.setAttribute('class', 'movieContainer');

            const movie = response.results[i];

            const title = document.createElement('h2');
            title.textContent = movie.title;

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            img.alt = movie.title;

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${movie.release_date}`;

            movieContainer.appendChild(title);
            movieContainer.appendChild(img);
            movieContainer.appendChild(releaseDate);

            movieContainer.addEventListener('click', () => {
                fetchMovieDetails(movie.id);
            });

            resultsContainer.appendChild(movieContainer);
        }
    } catch (err) {
        console.error(err);
    }
}

async function fetchMovieDetails(movieId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}` // Use environment variable here
        }
    };

    try {
        const data = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, options);
        const movie = await data.json();

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ""; // Clear the current content

        const movieDetailsContainer = document.createElement('div');
        movieDetailsContainer.setAttribute('class', 'movieDetailsContainer');

        const title = document.createElement('h1');
        title.textContent = movie.title;

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
        img.alt = movie.title;

        const overview = document.createElement('p');
        overview.textContent = movie.overview;

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${movie.release_date}`;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${movie.vote_average}`;

        movieDetailsContainer.appendChild(title);
        movieDetailsContainer.appendChild(img);
        movieDetailsContainer.appendChild(overview);
        movieDetailsContainer.appendChild(releaseDate);
        movieDetailsContainer.appendChild(rating);

        resultsContainer.appendChild(movieDetailsContainer);
    } catch (err) {
        console.error(err);
    }
}

async function fetchTVShow(name) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}` // Use environment variable here
        }
    };
    try {
        const data = await fetch(`https://api.themoviedb.org/3/search/tv?query=${name}`, options);
        const response = await data.json();
        const resultsContainer = document.getElementById('results');
        resultsContainer.setAttribute('class', 'resultContainer');
        resultsContainer.innerHTML = "";

        for (let i = 0; i < response.results.length; i++) {
            const movieContainer = document.createElement('div');
            movieContainer.setAttribute('class', 'movieContainer');

            const movie = response.results[i];

            const title = document.createElement('h2');
            title.textContent = movie.name;

            const img = document.createElement('img');
            img.src = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
            img.alt = movie.title;

            const releaseDate = document.createElement('p');
            releaseDate.textContent = `Release Date: ${movie.first_air_date}`;

            movieContainer.appendChild(title);
            movieContainer.appendChild(img);
            movieContainer.appendChild(releaseDate);

            movieContainer.addEventListener('click', () => {
                fetchTVShowDetails(movie.id);
            });

            resultsContainer.appendChild(movieContainer);
        }
    } catch (err) {
        console.error(err);
    }
}

async function fetchTVShowDetails(tvShowId) {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${process.env.TMDB_API_KEY}` // Use environment variable here
        }
    };

    try {
        const data = await fetch(`https://api.themoviedb.org/3/tv/${tvShowId}`, options);
        const tvShow = await data.json();

        const resultsContainer = document.getElementById('results');
        resultsContainer.innerHTML = ""; // Clear the current content

        const tvShowDetailsContainer = document.createElement('div');
        tvShowDetailsContainer.setAttribute('class', 'movieDetailsContainer');

        const title = document.createElement('h1');
        title.textContent = tvShow.name;

        const img = document.createElement('img');
        img.src = `https://image.tmdb.org/t/p/w500/${tvShow.poster_path}`;
        img.alt = tvShow.name;

        const overview = document.createElement('p');
        overview.textContent = tvShow.overview;

        const releaseDate = document.createElement('p');
        releaseDate.textContent = `Release Date: ${tvShow.first_air_date}`;

        const rating = document.createElement('p');
        rating.textContent = `Rating: ${tvShow.vote_average}`;

        const numSeasons = document.createElement('p');
        numSeasons.textContent = `Number of Seasons: ${tvShow.number_of_seasons}`;

        const numEpisodes = document.createElement('p');
        numEpisodes.textContent = `Number of Episodes: ${tvShow.number_of_episodes}`;

        const status = document.createElement('p');
        status.textContent = `Status: ${tvShow.status}`;

        tvShowDetailsContainer.appendChild(title);
        tvShowDetailsContainer.appendChild(img);
        tvShowDetailsContainer.appendChild(overview);
        tvShowDetailsContainer.appendChild(releaseDate);
        tvShowDetailsContainer.appendChild(rating);
        tvShowDetailsContainer.appendChild(numSeasons);
        tvShowDetailsContainer.appendChild(numEpisodes);
        tvShowDetailsContainer.appendChild(status);

        resultsContainer.appendChild(tvShowDetailsContainer);
    } catch (err) {
        console.error(err);
    }
}

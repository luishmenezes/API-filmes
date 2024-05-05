function searchMovies(movieTitle) {
    var apiKey = '352794fe'; // Substitua 'sua_api_key' pela sua chave da API OMDB
    var apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&s=${movieTitle}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        if (data.Response === "True") {
            var movies = data.Search;
            displayMovies(movies);
        } else {
            alert("Filmes não encontrados.");
        }
    })
    .catch(error => console.error('Erro ao buscar filmes:', error));
}

function displayMovies(movies) {
    var movieList = document.getElementById('movieList');
    movieList.innerHTML = '';

    movies.forEach(movie => {
        var movieItem = document.createElement('div');
        movieItem.classList.add('movie-item');
        movieItem.innerHTML = `
            <img src="${movie.Poster}" alt="${movie.Title}">
            <div class="movie-info">
                <h3>${movie.Title}</h3>
                <p>Ano: ${movie.Year}</p>
                <p>Tipo: ${movie.Type}</p>
            </div>
        `;
        movieItem.addEventListener('click', function() {
            showMovieDetails(movie.imdbID, movieItem);
        });
        movieList.appendChild(movieItem);
    });
}

function showMovieDetails(imdbID, movieItem) {
    var apiKey = '352794fe'; // Substitua 'sua_api_key' pela sua chave da API OMDB
    var apiUrl = `https://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`;

    fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        var movieDetails = `
            <h2>${data.Title}</h2>
            <p><strong>Ano:</strong> ${data.Year}</p>
            <p><strong>Gênero:</strong> ${data.Genre}</p>
            <p><strong>Nota IMDB:</strong> ${data.imdbRating}</p>
            <p><strong>Enredo:</strong> ${data.Plot}</p>
            
        `;
        var detailsDiv = document.createElement('div');
        detailsDiv.classList.add('movie-details');
        detailsDiv.innerHTML = movieDetails;

        // Adicionando os detalhes abaixo do filme clicado
        if (movieItem.nextSibling && movieItem.nextSibling.classList.contains('movie-details')) {
            movieItem.nextSibling.remove(); // Remove os detalhes se já existirem
        }
        movieItem.insertAdjacentElement('afterend', detailsDiv);
    })
    .catch(error => console.error('Erro ao buscar detalhes do filme:', error));
}

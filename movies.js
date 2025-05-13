const APILINK = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8a0bc1637c4e77422f2c0a8c859ef519&page=1';
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=8a0bc1637c4e77422f2c0a8c859ef519&query=';

const main = document.getElementById('section');
const form = document.getElementById('form');
const search = document.getElementById('query');

// Load popular movies initially
returnMovies(APILINK);

function returnMovies(url) {
  fetch(url)
    .then(res => res.json())
    .then(data => {
      main.innerHTML = ''; // Clear previous results

      data.results.forEach(movie => {
        const div_column = document.createElement('div');
        div_column.setAttribute('class', 'column');

        const div_card = document.createElement('div');
        div_card.setAttribute('class', 'card');

        const image = document.createElement('img');
        image.setAttribute('class', 'thumbnail');
        image.src = movie.poster_path
          ? IMG_PATH + movie.poster_path
          : 'https://via.placeholder.com/220x300?text=No+Image';

        const title = document.createElement('h3');
        title.textContent = movie.title;

        const rating = document.createElement('p');
        rating.innerHTML = `Rating: <strong>${movie.vote_average}</strong>`;

        const release = document.createElement('p');
        release.textContent = ` Released: ${movie.release_date || 'Unknown'}`;

        const overview = document.createElement('p');
        overview.textContent = truncateText(movie.overview || 'No overview available.', 100);

        const center = document.createElement('center');
        center.appendChild(image);

        div_card.appendChild(center);
        div_card.appendChild(title);
        div_card.appendChild(rating);
        div_card.appendChild(release);
        div_card.appendChild(overview);

        div_column.appendChild(div_card);
        main.appendChild(div_column);
      });
    })
    .catch(err => {
      console.error('Error fetching movies:', err);
      main.innerHTML = '<p>Failed to load movies. Please try again later.</p>';
    });
}

// Shortens long text
function truncateText(text, maxLength) {
  return text.length > maxLength ? text.slice(0, maxLength) + '…' : text;
}

// Search form handler
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const searchTerm = search.value.trim();

  if (searchTerm) {
    returnMovies(SEARCHAPI + searchTerm);
    search.value = '';
  }
});

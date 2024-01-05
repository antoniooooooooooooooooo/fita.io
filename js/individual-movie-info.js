// Extract the movie slug from the URL parameters
const urlParams = new URLSearchParams(window.location.search);
const movieSlug = urlParams.get('slug');
console.log('Movie Slug:', movieSlug);

// Fetch data from the API using the extracted slug
// Fetch data from the API using the extracted slug
const url = `https://api.cosmicjs.com/v3/buckets/fita-production/objects/${movieSlug}?read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('API Response:', data);

        // Check if the data has the expected structure
        if (data.object && data.object.metadata) {
            const movieData = data.object.metadata;

            // Update movie details on the page
            document.getElementById('movie-details-photo').src = movieData.photo.url;
            document.getElementById('movie-details-title').textContent = data.object.title;
            document.getElementById('movie-details-titles1').textContent = data.object.title;

            document.getElementById('movie-details-ano').textContent = movieData.ano;

            document.getElementById('movie-details-duracao').textContent = movieData.duracao;
            document.getElementById('movie-details-genero').textContent = movieData.genero.value; // Updated line
            document.getElementById('movie-details-realizacao').textContent = movieData.realizacao;
            document.getElementById('movie-details-descricao').textContent = movieData.descricao;
            document.getElementById('movie-details-plataformas').textContent = movieData.plataformas;
            
            // Set photo2 and photo3 to the same value as photo1 if they are not present
            document.getElementById('movie-details-photo1').src = movieData.photo1.url;
            document.getElementById('movie-details-photo2').src = movieData.photo2 ? movieData.photo2.url : movieData.photo1.url;
            document.getElementById('movie-details-photo3').src = movieData.photo3 ? movieData.photo3.url : movieData.photo1.url;
        } else {
            throw new Error('Invalid API response structure or movie not found');
        }
    })
    .catch(error => console.error('Error fetching data:', error));

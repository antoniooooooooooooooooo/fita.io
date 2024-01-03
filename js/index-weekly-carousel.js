document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API
    fetch('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=100&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,')
        .then(response => response.json())
        .then(data => {
            // Reference to the carousel inner container
            const carouselInner = document.getElementById('carouselInner');
            const carousel = new bootstrap.Carousel(document.getElementById('meuCarrossel')); // Initialize the Carousel

            // Separate indices for carousel and film section
            let carouselIndex = 0;
            let filmSectionIndex = 0;

            // Loop through each movie
            data.objects.forEach((movie, index) => {
                // Check if the movie is for this week (semana is true)
                if (movie.metadata.semana === true) {
                    // Create a carousel item
                    const carouselItem = document.createElement('div');
                    carouselItem.className = carouselIndex === 0 ? 'carousel-item active' : 'carousel-item';

                    // Create an overlay div
                    const overlay = document.createElement('div');
                    overlay.className = 'overlay';

                    // Create a link to the movie details page
                    const movieLink = document.createElement('a');
                    movieLink.href = `individual.html?slug=${movie.id}`;

                    // Create an element for the movie image
                    const movieImage = document.createElement('img');
                    movieImage.src = movie.metadata.photo1 ? movie.metadata.photo1.url : '';
                    movieImage.alt = `Imagem ${movie.title}`;
                    movieImage.className = 'd-block w-100';

                    // Create a container for the movie name and duration
                    const infoContainer = document.createElement('div');
                    infoContainer.className = 'info-container position-absolute bottom-0 start-0 mb-3 ms-3'; // Ajustei o valor de mb-3

                    // Create an element for the movie name
                    const movieName = document.createElement('h5');
                    movieName.textContent = movie.title;

                    // Create an element for the movie duration
                    const movieDuration = document.createElement('p');
                    movieDuration.textContent = `Duração: ${movie.metadata.duracao || 'N/A'}`;

                    // Append the elements to the info container
                    infoContainer.appendChild(movieName);
                    infoContainer.appendChild(movieDuration);

                    // Append the link to the carousel item
                    movieLink.appendChild(movieImage);
                    carouselItem.appendChild(movieLink);

                    // Append the overlay to the carousel item
                    carouselItem.appendChild(overlay);

                    // Append the info container to the overlay
                    overlay.appendChild(infoContainer);

                    // Append the carousel item to the carousel inner container
                    carouselInner.appendChild(carouselItem);

                    // Increment carousel index
                    carouselIndex++;

                    // Event listener for the Bootstrap Carousel slide event
                    carouselInner.addEventListener('slide.bs.carousel', event => {
                        const activeIndex = event.to;
                        const activeCaption = document.querySelector('.carousel-display.active .movie-name');

                        // Update the movie name in the caption of the active carousel item
                        activeCaption.textContent = data.objects[activeIndex].title;
                    });

                    // Increment film section index
                    filmSectionIndex++;
                }
            });

            $('#meuCarrossel').carousel({
                interval: 2500
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});
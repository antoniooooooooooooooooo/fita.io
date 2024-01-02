document.addEventListener("DOMContentLoaded", function() {
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

                    // Create a link to the movie details page
                    const movieLink = document.createElement('a');
                    movieLink.href = `individual.html?slug=${movie.id}`;

                    // Create an element for the movie image
                    const movieImage = document.createElement('img');
                    movieImage.src = movie.metadata.photo1 ? movie.metadata.photo1.url : '';
                    movieImage.alt = `Imagem ${movie.title}`;
                    movieImage.className = 'd-block w-100';

                    // Create an element for the movie name

                    // Append the elements to the movie link
                    movieLink.appendChild(movieImage);
      

                    // Append the link to the carousel item
                    carouselItem.appendChild(movieLink);

                    // Append the carousel item to the carousel inner container
                    carouselInner.appendChild(carouselItem);

                    // Increment carousel index
                    carouselIndex++;

                    // Event listener for the Bootstrap Carousel slide event
  

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
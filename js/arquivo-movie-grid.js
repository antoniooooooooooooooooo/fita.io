        // Function to show movies based on color
        function showFilmes(filmes, color) {
            // Fetch data from the API
            const apiUrl = filmes === 'all'
                ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=200&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
                : 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor%22:%22' + color + '%22%7D&limit=10&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,';

            fetchMovies(apiUrl);
        }

        // Function to show options based on the selected button
        function showOptions(optionType) {
            // Reference to the container for options
            const optionsContainer = document.getElementById('optionsContainer');

            // Toggle visibility of the options container
            if (optionsContainer.style.display === 'none' || optionsContainer.style.display === '') {
                // Show the options container
                optionsContainer.style.display = 'block';

                // Add the options based on the selected type
                switch (optionType) {
                    case 'years':
                        const years = ['1920s', '1930s', '1940s', '1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
                        years.forEach(year => {
                            const yearOption = createOptionElement(year, showMoviesByYearRange);
                            optionsContainer.appendChild(yearOption);
                        });
                        break;

                    case 'colors':
                        const colors = ['Preto', 'Branco', 'Azul', 'Castanho', 'Verde', 'Laranja', 'Rosa', 'Vermelho', 'Amarelo', 'Roxo'];
                        colors.forEach(color => {
                            const colorOption = createOptionElement(color, showMoviesByColor);
                            optionsContainer.appendChild(colorOption);
                        });
                        break;

                    case 'genres':
                        const genres = ['Ação', 'Comédia', 'Documentário', 'Drama', 'Musical', 'Aventura', 'Terror', 'Biografia', 'Animação'];
                        genres.forEach(genre => {
                            const genreOption = createOptionElement(genre, showMoviesByGenre);
                            optionsContainer.appendChild(genreOption);
                        });
                        break;

                    default:
                        break;
                }
            } else {
                // Hide the options container
                optionsContainer.style.display = 'none';

                // Clear previous options
                optionsContainer.innerHTML = '';
            }
        }

        // Function to show movies based on year range
        function showMoviesByYearRange(yearRange) {
            const startYear = parseInt(yearRange);
            const endYear = startYear + 9;

            // Fetch data from the API based on the selected year range
            const apiUrl = `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.ano%22:%7B%22$gte%22:${startYear},%22$lte%22:${endYear}%7D%7D&limit=10&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

            fetchMovies(apiUrl);
        }

        // Function to show genre options
        function showMoviesByGenre(genre) {
            // Fetch data from the API based on the selected genre
            const apiUrl = `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.genero%22:%22${genre}%22%7D&limit=10&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

            fetchMovies(apiUrl);
        }

        // Function to show movies based on color
        function showMoviesByColor(color) {
            // Fetch data from the API based on the selected color
            const apiUrl = color === 'all'
                ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=10&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
                : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor.key%22:%22${color}%22%7D&limit=10&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

            // Pass the selected color to showFilmes
            showFilmes('color', color);
        }

        // Helper function to create an option element with an event listener
        function createOptionElement(value, clickHandler) {
            const optionElement = document.createElement('span');
            optionElement.className = 'option';
            optionElement.textContent = value;

            // Add event listener to call the specified click handler with the corresponding value
            optionElement.addEventListener('click', () => clickHandler(value));

            return optionElement;
        }

        // Function to show movies based on search
        function showMoviesBySearch() {
            // Get the search input value
            const searchTerm = document.getElementById('search-input').value;

            // Fetch data from the API based on the entered search term
            const apiUrl = `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22title%22:%7B%22$regex%22:%22${searchTerm}%22,%22$options%22:%22i%22%7D%7D&limit=10&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

            fetchMovies(apiUrl);
        }

        // Add an event listener to the search input for the 'input' event
        document.getElementById('search-input').addEventListener('input', function () {
            // Call the showMoviesBySearch function whenever the input changes
            showMoviesBySearch();
        });

        // Function to fetch movies based on the provided API URL
        function fetchMovies(apiUrl) {
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Reference to the grid container
                    const gridContainer = document.querySelector('.grid-container');

                    // Clear previous movies
                    gridContainer.innerHTML = '';

                    // Loop through each movie and create a movie item
                    data.objects.forEach(movie => {
                        // Create a movie item
                        const movieItem = document.createElement('div');
                        movieItem.className = 'movie-item';

                        // Create a link to the movie details page
                        const movieLink = document.createElement('a');
                        movieLink.href = `individual.html?slug=${movie.id}`; // Pass the movie slug as a query parameter
                        movieLink.innerHTML = `<img src="${movie.metadata.photo.url}"  alt="${movie.title}">`;

                        // Append the link to the movie item
                        movieItem.appendChild(movieLink);

                        // Append the movie item to the grid container
                        gridContainer.appendChild(movieItem);
                    });
                })
                .catch(error => console.error('Error fetching data:', error));
        }

        // Fetch data from the API and display all movies initially
        showFilmes('all');
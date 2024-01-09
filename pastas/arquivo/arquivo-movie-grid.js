// Function to show movies based on color
function showFilmes(filmes, color) {
    // Fetch data from the API
    const apiUrl = filmes === 'all'
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor%22:%22' + color + '%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,';

    fetchMovies(apiUrl);
}

// Initialize a variable to keep track of the current option container
let currentOptionsContainer = null;

function showOptions(optionType) {
    // Reference to the container for options
    const optionsContainer = document.getElementById('optionsContainer');

    // Remove underline class from all buttons
    const buttons = document.querySelectorAll('.special');
    buttons.forEach(button => {
        button.classList.remove('underline');
    });

    // Toggle visibility of the options container
    if (optionsContainer.style.display === 'none' || optionsContainer.style.display === '') {
        // Show the options container
        optionsContainer.style.display = 'block';

        // Clear previous options
        optionsContainer.innerHTML = '';

        // Add the options based on the selected type
        switch (optionType) {
            case 'years':
                const years = ['1950s', '1960s', '1970s', '1980s', '1990s', '2000s', '2010s', '2020s'];
                years.forEach(year => {
                    const yearOption = createOptionElement(year, showMoviesByYearRange);
                    optionsContainer.appendChild(yearOption);
                });
                break;
            case 'colors':
                const colorNames = ['Branco', 'Cinzento', 'Preto', 'Castanho', 'Azul', 'Verde', 'Amarelo', 'Laranja', 'Vermelho', 'Rosa', 'Roxo'];
                const colorCodes = ['#F1F1F1', '#808080', '#000000', '#8C654F', '#00B0FF', '#2ECC71', '#FFBB04', '#FF6322', '#E8322D', '#FF3E8E', '#9F4BF2'];

                const colorOptionsContainer = document.createElement('div');
                colorOptionsContainer.style.display = 'flex';
                colorOptionsContainer.style.marginLeft = '-30px';

                for (let i = 0; i < colorNames.length; i++) {
                    const colorOption = createOptionElement(colorNames[i], showMoviesByColor);
                    colorOption.style.backgroundColor = colorCodes[i];
                    colorOption.style.width = '110px';
                    colorOption.style.height = '40px';
                    colorOption.style.margin = '6px';
                    colorOption.style.color = 'transparent';

                    colorOptionsContainer.appendChild(colorOption);
                }

                optionsContainer.appendChild(colorOptionsContainer);

                break;
            case 'genres':
                const genres = ['Ação', 'Comédia', 'Documentário', 'Drama', 'Musical', 'Aventura', 'Terror', 'Biografia', 'Animação', 'Romance', 'Sci-fi', 'Mistério'];

                // Create a flex container for genres
                const genresOptionsContainer = document.createElement('div');
                genresOptionsContainer.style.display = 'flex';
                // Allow genres to wrap to the next line if needed

                genres.forEach(genre => {
                    const genreOption = createOptionElement(genre, showMoviesByGenre);
                    genresOptionsContainer.appendChild(genreOption);
                });

                // Append the genres container to the main options container
                optionsContainer.appendChild(genresOptionsContainer);
                break;

            default:
                break;
        }

        // Call showFilmes with 'all' to display the default movies
        showFilmes('all');
    } else {
        // Hide the options container
        optionsContainer.style.display = 'none';
    }

    // Add underline class to the selected button
    const selectedButton = document.querySelector(`.special[data-option="${optionType}"]`);
    if (selectedButton) {
        selectedButton.classList.add('underline');
    }
}


// Function to show movies based on color
// Function to show movies based on color
// Function to show movies based on color
let selectedColor = 'all';
let selectedGenre = 'all';
let selectedYearRange = 'all';
let selectedSorting = '';
// Function to show movies based on year range
// Function to show movies based on year range
// Function to show movies based on year range
function showMoviesByYearRange(yearRange) {
    const startYear = parseInt(yearRange);
    const endYear = startYear + 9;

    // Fetch data from the API based on the selected year range, color, and sorting option
    const apiUrl = (selectedYearRange === 'all')
        ? `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.ano%22:%7B%22$gte%22:${startYear},%22$lte%22:${endYear}%7D%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.ano%22:%7B%22$gte%22:${startYear},%22$lte%22:${endYear}%7D,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    // Call fetchMovies with both color and sorting options
    fetchMovies(apiUrl, selectedSorting, selectedYearRange);

    // Update styling for selected option
    updateSelectedOption('years', yearRange);
}

// Add this function to update the styling for the selected option
// Function to update the styling for the selected optio



// Function to show movies based on genre
// Function to show movies based on genre
function showMoviesByGenre(genre) {
   
    const apiUrl = (selectedGenre === 'all')
        ? `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.genero%22:%22${genre}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.genero%22:%22${genre}%22,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    // Call fetchMovies with both color and sorting options
    fetchMovies(apiUrl, selectedSorting, selectedGenre);
}





// Function to show movies based on color
function showMoviesByColor(color) {
    selectedColor = color;  // Update selected color
    const apiUrl = (color === 'all')
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor.key%22:%22${color}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    fetchMovies(apiUrl, selectedSorting, color);
}




// Helper function to create an option element with an event listener
function createOptionElement(value, clickHandler) {
    const optionElement = document.createElement('span');
    optionElement.className = 'option';
    optionElement.textContent = value;
    optionElement.innerHTML = value.replace('-', '&#8209;');
    // Add event listener to call the specified click handler with the corresponding value
    optionElement.addEventListener('click', () => clickHandler(value));

    return optionElement;
}

function updateSelectedOption(optionType, value) {
    // Remove underline class from all options
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('underline');
    });

    // Add underline class to the selected option
    const selectedOption = document.querySelector(`.option[data-type="${optionType}"][data-index="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('underline');
    }

    // Remove underline class from all buttons
    const buttons = document.querySelectorAll('.special');
    buttons.forEach(button => {
        button.classList.remove('underline');
    });

    // Add underline class to the selected button
    const selectedButton = document.querySelector(`.special[data-option="${optionType}"]`);
    if (selectedButton) {
        selectedButton.classList.add('underline');
    }
}


// Function to show movies based on search
function showMoviesBySearch() {
    // Get the search input value
    const searchTerm = document.getElementById('search-input').value;

    // Fetch data from the API based on the entered search term
    const apiUrl = `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22title%22:%7B%22$regex%22:%22${searchTerm}%22,%22$options%22:%22i%22%7D%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    fetchMovies(apiUrl);
}

// Add an event listener to the search input for the 'input' event
document.getElementById('search-input').addEventListener('input', function () {
    // Call the showMoviesBySearch function whenever the input changes
    showMoviesBySearch();
});

function fetchMovies(apiUrl, sortingOption) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Sort movies based on the selected sorting option
            let sortedMovies;
            if (sortingOption === 'year') {
                sortedMovies = data.objects.sort((a, b) => a.metadata.ano - b.metadata.ano);
            } else if (sortingOption === 'title') {
                sortedMovies = data.objects.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                // Display movies randomly when no sorting option is selected
                sortedMovies = data.objects.sort(() => Math.random() - 0.5);
            }

            // Reference to the grid container
            const gridContainer = document.querySelector('.grid-container');

            // Clear previous movies
            gridContainer.innerHTML = '';

            // Loop through each movie and create a movie item
            sortedMovies.forEach(movie => {
                // Create a movie item
                const movieItem = document.createElement('div');
                movieItem.className = 'movie-item';

                // Create a link to the movie details page
                const movieLink = document.createElement('a');
                movieLink.href = `/fita.io/pastas/individual/index.html?slug=${movie.id}`;
                movieLink.innerHTML = `<img src="${movie.metadata.photo.url}" alt="${movie.title}">`;

                // Append the link to the movie item
                movieItem.appendChild(movieLink);

                // Append the movie item to the grid container
                gridContainer.appendChild(movieItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to handle sorting change
// Function to handle sorting change
// Function to handle sorting change
function handleSortingChange() {
    const sortingSelect = document.getElementById('sorting-select');
    selectedSorting = sortingSelect.value;  // Update selected sorting

    // Replace the API URL with the appropriate one for your use case
    const apiUrl = (selectedColor === 'all')
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    // Call fetchMovies with both color and sorting options
    fetchMovies(apiUrl, selectedSorting, selectedColor);

    // If the sorting option is 'title' or 'year', fetch the movies and apply sorting
    if (selectedSorting === 'title' || selectedSorting === 'year') {
        fetchMovies(apiUrl, selectedSorting, selectedColor);
    }
}


// Call fetchMovies to initially load movies with random sorting
fetchMovies('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id');


// Call fetchMovies to initially load movies
showFilmes('all');
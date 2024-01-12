function showFilmes(filmes, color) {
    // Fetch data da API
    const apiUrl = filmes === 'all'
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor%22:%22' + color + '%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,';

    fetchMovies(apiUrl);
}

// Inicializa a variável para mantermos track da opção atual no container
let currentOptionsContainer = null;

function showOptions(optionType) {
    // Referência ao container para as opções
    const optionsContainer = document.getElementById('optionsContainer');

    // Remove a underline para todos os botões 
    const buttons = document.querySelectorAll('.special');
    buttons.forEach(button => {
        button.classList.remove('underline');
    });

    // Toggle na visibilidade das opções
    if (optionsContainer.style.display === 'none' || optionsContainer.style.display === '') {
        // Mostra as opções
        optionsContainer.style.display = 'block';

        // Limpa as opções anteriores
        optionsContainer.innerHTML = '';

        // Adiciona as opções baseado no botão clicado
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

      
                const genresOptionsContainer = document.createElement('div');
                genresOptionsContainer.style.display = 'flex';
          

                genres.forEach(genre => {
                    const genreOption = createOptionElement(genre, showMoviesByGenre);
                    genresOptionsContainer.appendChild(genreOption);
                });

       
                optionsContainer.appendChild(genresOptionsContainer);
                break;

            default:
                break;
        }

        // Display dos filmes
        showFilmes('all');
    } else {
        // Esconde as opções
        optionsContainer.style.display = 'none';
    }

    // Adiciona a underline ao botão selecionado
    const selectedButton = document.querySelector(`.special[data-option="${optionType}"]`);
    if (selectedButton) {
        selectedButton.classList.add('underline');
    }
}

let selectedColor = 'all';
let selectedGenre = 'all';
let selectedYearRange = 'all';
let selectedSorting = '';

// Função para mostrar os filmes dentro de uma década
function showMoviesByYearRange(yearRange) {
    const startYear = parseInt(yearRange);
    const endYear = startYear + 9;

    const apiUrl = (selectedYearRange === 'all')
        ? `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.ano%22:%7B%22$gte%22:${startYear},%22$lte%22:${endYear}%7D%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.ano%22:%7B%22$gte%22:${startYear},%22$lte%22:${endYear}%7D,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;


    fetchMovies(apiUrl, selectedSorting, selectedYearRange);


    updateSelectedOption('years', yearRange);
}

// Função para mostrar os filmes de um determinado género
function showMoviesByGenre(genre) {
   
    const apiUrl = (selectedGenre === 'all')
        ? `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.genero%22:%22${genre}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.genero%22:%22${genre}%22,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;


    fetchMovies(apiUrl, selectedSorting, selectedGenre);
}

// Função para mostrar os filmes de uma determinada cor
function showMoviesByColor(color) {
    selectedColor = color;  
    const apiUrl = (color === 'all')
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor.key%22:%22${color}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    fetchMovies(apiUrl, selectedSorting, color);
}

//Função para criar uma opção com um event listener
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

    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('underline');
    });

    const selectedOption = document.querySelector(`.option[data-type="${optionType}"][data-index="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('underline');
    }


    const buttons = document.querySelectorAll('.special');
    buttons.forEach(button => {
        button.classList.remove('underline');
    });


    const selectedButton = document.querySelector(`.special[data-option="${optionType}"]`);
    if (selectedButton) {
        selectedButton.classList.add('underline');
    }
}


// Função para mostrar os filmes consoante a pesquisa
function showMoviesBySearch() {

    const searchTerm = document.getElementById('search-input').value;


    const apiUrl = `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22title%22:%7B%22$regex%22:%22${searchTerm}%22,%22$options%22:%22i%22%7D%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    fetchMovies(apiUrl);
}


document.getElementById('search-input').addEventListener('input', function () {

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

                sortedMovies = data.objects.sort(() => Math.random() - 0.5);
            }


            const gridContainer = document.querySelector('.grid-container');


            gridContainer.innerHTML = '';


            sortedMovies.forEach(movie => {

                const movieItem = document.createElement('div');
                movieItem.className = 'movie-item';


                const movieLink = document.createElement('a');
                movieLink.href = `individual/index.html?slug=${movie.id}`;
                movieLink.innerHTML = `<img src="${movie.metadata.photo.url}" alt="${movie.title}">`;


                movieItem.appendChild(movieLink);


                gridContainer.appendChild(movieItem);
            });
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Função para fazer os sortings
function handleSortingChange() {
    const sortingSelect = document.getElementById('sorting-select');
    selectedSorting = sortingSelect.value;


    const apiUrl = (selectedColor === 'all')
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;


    fetchMovies(apiUrl, selectedSorting, selectedColor);

    if (selectedSorting === 'title' || selectedSorting === 'year') {
        fetchMovies(apiUrl, selectedSorting, selectedColor);
    }
}



fetchMovies('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id');



showFilmes('all');
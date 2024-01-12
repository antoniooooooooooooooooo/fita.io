function showFilmes(filmes, color) {
    // Obter dados da API
    const apiUrl = filmes === 'all'
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor%22:%22' + color + '%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,';

    fetchMovies(apiUrl);
}

// Inicializar uma variável para controlar o contentor de opções atual
let currentOptionsContainer = null;

function showOptions(optionType) {
    // Referência ao contentor de opções
    const optionsContainer = document.getElementById('optionsContainer');

    // Remover a classe de sublinhado de todos os botões
    const buttons = document.querySelectorAll('.special');
    buttons.forEach(button => {
        button.classList.remove('underline');
    });

    // Alternar a visibilidade do contentor de opções
    if (optionsContainer.style.display === 'none' || optionsContainer.style.display === '') {
        // Mostrar o contentor de opções
        optionsContainer.style.display = 'block';

        // Limpar opções anteriores
        optionsContainer.innerHTML = '';

        // Adicionar as opções com base no tipo selecionado
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

                // Criar um contentor flexível para os géneros
                const genresOptionsContainer = document.createElement('div');
                genresOptionsContainer.style.display = 'flex';
                // Permitir que os géneros quebrem para a linha seguinte, se necessário

                genres.forEach(genre => {
                    const genreOption = createOptionElement(genre, showMoviesByGenre);
                    genresOptionsContainer.appendChild(genreOption);
                });

                // Anexar o contentor de géneros ao contentor principal de opções
                optionsContainer.appendChild(genresOptionsContainer);
                break;

            default:
                break;
        }

        // Chamar showFilmes com 'all' para exibir os filmes padrão
        showFilmes('all');
    } else {
        // Esconder o contentor de opções
        optionsContainer.style.display = 'none';
    }

    // Adicionar a classe de sublinhado ao botão selecionado
    const selectedButton = document.querySelector(`.special[data-option="${optionType}"]`);
    if (selectedButton) {
        selectedButton.classList.add('underline');
    }
}


// Função para mostrar filmes com base na cor
// Função para mostrar filmes com base na cor
// Função para mostrar filmes com base na cor
let selectedColor = 'all';
let selectedGenre = 'all';
let selectedYearRange = 'all';
let selectedSorting = '';
// Função para mostrar filmes com base no intervalo de anos
// Função para mostrar filmes com base no intervalo de anos
// Função para mostrar filmes com base no intervalo de anos
function showMoviesByYearRange(yearRange) {
    const startYear = parseInt(yearRange);
    const endYear = startYear + 9;

    // Obter dados da API com base no intervalo de anos, cor e opção de ordenação selecionada
    const apiUrl = (selectedYearRange === 'all')
        ? `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.ano%22:%7B%22$gte%22:${startYear},%22$lte%22:${endYear}%7D%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.ano%22:%7B%22$gte%22:${startYear},%22$lte%22:${endYear}%7D,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    // Chamar fetchMovies com opções de cor e ordenação
    fetchMovies(apiUrl, selectedSorting, selectedYearRange);

    // Atualizar o estilo para a opção selecionada
    updateSelectedOption('years', yearRange);
}

// Adicionar esta função para atualizar o estilo para a opção selecionada
// Função para atualizar o estilo para a opção selecionada



// Função para mostrar filmes com base no género
// Função para mostrar filmes com base no género
function showMoviesByGenre(genre) {
   
    const apiUrl = (selectedGenre === 'all')
        ? `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.genero%22:%22${genre}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.genero%22:%22${genre}%22,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    // Chamar fetchMovies com opções de cor e ordenação
    fetchMovies(apiUrl, selectedSorting, selectedGenre);
}





// Função para mostrar filmes com base na cor
function showMoviesByColor(color) {
    selectedColor = color;  // Atualizar a cor selecionada
    const apiUrl = (color === 'all')
        ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
        : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor.key%22:%22${color}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    fetchMovies(apiUrl, selectedSorting, color);
}




// Função auxiliar para criar um elemento de opção com um gestor de eventos
function createOptionElement(value, clickHandler) {
    const optionElement = document.createElement('span');
    optionElement.className = 'option';
    optionElement.textContent = value;
    optionElement.innerHTML = value.replace('-', '&#8209;');
    // Adicionar um gestor de eventos para chamar o gestor de cliques especificado com o valor correspondente
    optionElement.addEventListener('click', () => clickHandler(value));

    return optionElement;
}

function updateSelectedOption(optionType, value) {
    // Remover a classe de sublinhado de todas as opções
    const options = document.querySelectorAll('.option');
    options.forEach(option => {
        option.classList.remove('underline');
    });

    // Adicionar a classe de sublinhado à opção selecionada
    const selectedOption = document.querySelector(`.option[data-type="${optionType}"][data-index="${value}"]`);
    if (selectedOption) {
        selectedOption.classList.add('underline');
    }

    // Remover a classe de sublinhado de todos os botões
    const buttons = document.querySelectorAll('.special');
    buttons.forEach(button => {
        button.classList.remove('underline');
    });

    // Adicionar a classe de sublinhado ao botão selecionado
    const selectedButton = document.querySelector(`.special[data-option="${optionType}"]`);
    if (selectedButton) {
        selectedButton.classList.add('underline');
    }
}


// Função para mostrar filmes com base na pesquisa
function showMoviesBySearch() {
    // Obter o valor de pesquisa de entrada
    const searchTerm = document.getElementById('search-input').value;

    // Obter dados da API com base no termo de pesquisa introduzido
    const apiUrl = `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22title%22:%7B%22$regex%22:%22${searchTerm}%22,%22$options%22:%22i%22%7D%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

    fetchMovies(apiUrl);
}

// Adicionar um gestor de eventos à entrada de pesquisa para o evento 'input'
document.getElementById('search-input').addEventListener('input', function () {
    // Chamar a função showMoviesBySearch sempre que a entrada mudar
    showMoviesBySearch();
});

function fetchMovies(apiUrl, sortingOption) {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Ordenar filmes com base na opção de ordenação selecionada
            let sortedMovies;
            if (sortingOption === 'year') {
                sortedMovies = data.objects.sort((a, b) => a.metadata.ano - b.metadata.ano);
            } else if (sortingOption === 'title') {
                sortedMovies = data.objects.sort((a, b) => a.title.localeCompare(b.title));
            } else {
                // Exibir filmes aleatoriamente quando nenhuma opção de ordenação é selecionada
                sortedMovies = data.objects.sort(() => Math.random() - 0.5);
            }

            // Referência ao contentor da grelha
            const gridContainer = document.querySelector('.grid-container');

            // Limpar filmes anteriores
            gridContainer.innerHTML = '';

            // Iterar por cada filme e criar um item de filme
            sortedMovies.forEach(movie => {
                // Criar um item de filme
                const movieItem = document.createElement('div');
                movieItem.className = 'movie-item';

                // Criar um link para a página de detalhes do filme
                const movieLink = document.createElement('a');
                movieLink.href = `individual/index.html?slug=${movie.id}`;
                movieLink.innerHTML = `<img src="${movie.metadata.photo.url}" alt="${movie.title}">`;

// Adiciona o link ao elemento de filme
movieItem.appendChild(movieLink);

// Adiciona o elemento de filme ao contentor da grelha
gridContainer.appendChild(movieItem);
});
})
.catch(error => console.error('Erro ao obter dados:', error));
}

// Função para lidar com a alteração de ordenação
function handleSortingChange() {
const sortingSelect = document.getElementById('sorting-select');
selectedSorting = sortingSelect.value;  // Atualiza a ordenação selecionada

// Substitui o URL da API pelo apropriado para o seu caso de uso
const apiUrl = (selectedColor === 'all')
    ? 'https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,'
    : `https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22,%22metadata.cor.key%22:%22${selectedColor}%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,`;

// Chama fetchMovies com opções de cor e ordenação
fetchMovies(apiUrl, selectedSorting, selectedColor);

// Se a opção de ordenação for 'title' ou 'year', obtenha os filmes e aplique a ordenação
if (selectedSorting === 'title' || selectedSorting === 'year') {
    fetchMovies(apiUrl, selectedSorting, selectedColor);
}
}

// Chama fetchMovies para carregar inicialmente os filmes com ordenação aleatória
fetchMovies('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id/');

// Chama fetchMovies para carregar inicialmente os filmes
showFilmes('all');

document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API
    fetch('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=300&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,')
        .then(response => response.json())
        .then(data => {
            // Referência ao contentor interno do carrossel
            const carouselInner = document.getElementById('carouselInner');
            const carousel = new bootstrap.Carousel(document.getElementById('meuCarrossel')); // Inicializar o Carrossel

            // Índices separados para o carrossel e a secção de filmes
            let carouselIndex = 0;
            let filmSectionIndex = 0;

            // Iterar sobre cada filme
            data.objects.forEach((movie, index) => {
                // Verificar se o filme é desta semana (semana é verdadeiro)
                if (movie.metadata.semana === true) {
                    // Criar um item no carrossel
                    const carouselItem = document.createElement('div');
                    carouselItem.className = carouselIndex === 0 ? 'carousel-item active' : 'carousel-item';

                    // Criar uma sobreposição
                    const overlay = document.createElement('div');
                    overlay.className = 'overlay';

                    // Criar um link para a página de detalhes do filme
                    const movieLink = document.createElement('a');
                    movieLink.href = `individual.html?slug=${movie.id}`;

                    // Criar um elemento para a imagem do filme
                    const movieImage = document.createElement('img');
                    movieImage.src = movie.metadata.photo1 ? movie.metadata.photo1.url : '';
                    movieImage.alt = `Imagem ${movie.title}`;
                    movieImage.className = 'd-block w-100';

                    // Criar um contentor para o nome e a duração do filme
                    const infoContainer = document.createElement('div');
                    infoContainer.className = 'info-container position-absolute bottom-0 start-0 mb-3 ms-3';

                    // Criar um elemento para o nome do filme
                    const movieName = document.createElement('h1');
                    movieName.textContent = movie.title;

                    // Criar um elemento para a duração do filme
                    const movieDuration = document.createElement('p');
                    movieDuration.textContent = ` ${movie.metadata.duracao || 'N/A'}`;

                    // Criar um contentor para a descrição do filme
                    const descricaoContainer = document.createElement('div');
                    descricaoContainer.className = 'movie-details-descricao';
                    descricaoContainer.innerHTML = `<p>${movie.metadata.descricao || 'Descrição não disponível'}</p>`;
                    descricaoContainer.style.width = '50%'; // Ajustar conforme necessário

                    // Anexar os elementos ao contentor de informação
                    infoContainer.appendChild(movieName);
                    infoContainer.appendChild(movieDuration);
                    infoContainer.appendChild(descricaoContainer);

                    // Anexar o link ao item do carrossel
                    movieLink.appendChild(movieImage);
                    carouselItem.appendChild(movieLink);

                    // Anexar a sobreposição ao item do carrossel
                    carouselItem.appendChild(overlay);

                    // Anexar o contentor de informação à sobreposição
                    overlay.appendChild(infoContainer);

                    // Anexar o item do carrossel ao contentor interno do carrossel
                    carouselInner.appendChild(carouselItem);

                    // Incrementar o índice do carrossel
                    carouselIndex++;

                    // Listener de evento para o evento de deslize do Carrossel Bootstrap
                    carouselInner.addEventListener('slide.bs.carousel', event => {
                        const activeIndex = event.to;
                        const activeCaption = document.querySelector('.carousel-display.active .movie-name');

                        // Atualizar o nome do filme na legenda do item ativo do carrossel
                        activeCaption.textContent = data.objects[activeIndex].title;
                    });

                    // Incrementar o índice da secção de filmes
                    filmSectionIndex++;
                }
            });

            $('#meuCarrossel').carousel({
                interval: 2500
            });
        })
        .catch(error => console.error('Erro ao obter dados:', error));
});

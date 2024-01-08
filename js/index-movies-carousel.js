// Aguardar até que o DOM esteja completamente carregado
document.addEventListener("DOMContentLoaded", function () {
    // Fazer uma requisição à API CosmicJS para obter informações sobre filmes
    fetch('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=200&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,')
        .then(response => response.json()) // Converter a resposta para JSON
        .then(data => {
            // Referência ao elemento que contém os slides do Swiper
            const swiperWrapper = document.getElementById('swiper-wrapper');

            // Iterar sobre cada filme e criar um slide no Swiper
            data.objects.forEach(movie => {
                // Verificar se o filme é desta semana (semana é verdadeiro)
                if (movie.metadata.semana === true) {
                    // Criar um slide no Swiper
                    const swiperSlide = document.createElement('div');
                    swiperSlide.className = 'swiper-slide';

                    // Criar um link para a página de detalhes do filme
                    const movieLink = document.createElement('a');
                    movieLink.href = `individual.html?slug=${movie.id}`;

                    // Criar uma imagem de capa do filme
                    const movieCover = document.createElement('img');
                    movieCover.src = movie.metadata.photo.url || '';
                    movieCover.alt = `Capa do Filme ${movie.title}`;
                    movieCover.className = 'd-block w-100 weekly-carousel-image';
                    movieCover.style.height = '500px';

                    // Anexar a imagem ao link e o link ao slide
                    movieLink.appendChild(movieCover);
                    swiperSlide.appendChild(movieLink);

                    // Anexar o slide ao wrapper do Swiper
                    swiperWrapper.appendChild(swiperSlide);
                }
            });

            // Inicializar o Swiper com opções de configuração
            const swiper = new Swiper('#filmesSemanaCarousel', {
                slidesPerView: 4,
                spaceBetween: 15,
                navigation: {
                    nextEl: '.custom-carousel-control-next-filmesSemana',
                    prevEl: '.custom-carousel-control-prev-filmesSemana',
                },
                breakpoints: {
                    // Quando a altura da tela é maior ou igual a 1200 pixels
                    1200: {
                        slidesPerView: 4,
                        slidesPerGroup: 4,
                    },
                    // Quando a altura da tela é menor que 1200 pixels
                    768: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                    // Quando a altura da tela é menor que 768 pixels
                    320: {
                        slidesPerView: 2,
                        slidesPerGroup: 2,
                    },
                },
            });
        })
        .catch(error => console.error('Erro ao obter dados:', error)); // Lidar com erros de requisição
});

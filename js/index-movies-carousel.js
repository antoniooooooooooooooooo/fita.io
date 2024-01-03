document.addEventListener("DOMContentLoaded", function () {
    fetch('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=100&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,')
        .then(response => response.json())
        .then(data => {
            const swiperWrapper = document.getElementById('swiper-wrapper');

            data.objects.forEach(movie => {
                if (movie.metadata.semana === true) {
                    const swiperSlide = document.createElement('div');
                    swiperSlide.className = 'swiper-slide';

                    const movieLink = document.createElement('a');
                    movieLink.href = `individual.html?slug=${movie.id}`;

                    const movieCover = document.createElement('img');
                    movieCover.src = movie.metadata.photo.url || '';
                    movieCover.alt = `Capa do Filme ${movie.title}`;
                    movieCover.className = 'd-block w-100 weekly-carousel-image';
                    movieCover.style.height = '500px'; // Defina a altura desejada aqui


                    movieLink.appendChild(movieCover);
                    swiperSlide.appendChild(movieLink);

                    swiperWrapper.appendChild(swiperSlide);
                }
            });

            const swiper = new Swiper('#filmesSemanaCarousel', {
                slidesPerView: 4,
                spaceBetween: 15,
                navigation: {
                    nextEl: '.custom-carousel-control-next-filmesSemana',
                    prevEl: '.custom-carousel-control-prev-filmesSemana',
                },
            });
        })
        .catch(error => console.error('Error fetching data:', error));
});

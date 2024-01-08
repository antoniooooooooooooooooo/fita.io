// Extrair o slug do filme a partir dos parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const movieSlug = urlParams.get('slug');
console.log('Slug do Filme:', movieSlug);

// Obter dados da API usando o slug extraído
const url = `https://api.cosmicjs.com/v3/buckets/fita-production/objects/${movieSlug}?read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata`;

fetch(url)
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro HTTP! Estado: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Resposta da API:', data);

        // Verificar se os dados têm a estrutura esperada
        if (data.object && data.object.metadata) {
            const movieData = data.object.metadata;

            // Atualizar detalhes do filme na página
            document.getElementById('movie-details-photo').src = movieData.photo.url;
            document.getElementById('movie-details-title').textContent = data.object.title;
            document.getElementById('movie-details-titles1').textContent = data.object.title;

            document.getElementById('movie-details-ano').textContent = movieData.ano;

            document.getElementById('movie-details-duracao').textContent = movieData.duracao;
            document.getElementById('movie-details-genero').textContent = movieData.genero.value; // Linha atualizada
            document.getElementById('movie-details-realizacao').textContent = movieData.realizacao;
            document.getElementById('movie-details-descricao').textContent = movieData.descricao;
            document.getElementById('movie-details-plataformas').textContent = movieData.plataformas;
            
            // Definir photo2 e photo3 com o mesmo valor que photo1 se não estiverem presentes
            document.getElementById('movie-details-photo1').src = movieData.photo1.url;
            document.getElementById('movie-details-photo2').src = movieData.photo2 ? movieData.photo2.url : movieData.photo1.url;
            document.getElementById('movie-details-photo3').src = movieData.photo3 ? movieData.photo3.url : movieData.photo1.url;
        } else {
            throw new Error('Estrutura de resposta da API inválida ou filme não encontrado');
        }
    })
    .catch(error => console.error('Erro ao obter dados:', error));

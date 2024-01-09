// Extrair o slug do filme dos parâmetros da URL
const urlParams = new URLSearchParams(window.location.search);
const sobreSlug = urlParams.get('slug');
console.log('Slug do Sobre:', sobreSlug);

// Obter dados da API usando o slug extraído
const url = `https://api.cosmicjs.com/v3/buckets/fita-production/objects/65789d5bd4352285f90e09e4?read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,`;
console.log(url);

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
            const sobreData = data.object.metadata;

            // Atualizar detalhes sobre a página
            document.getElementById('sobre-details-titulo').textContent = sobreData.titulo;
            document.getElementById('sobre-details-conteudo').textContent = sobreData.conteudo;
        } else {
            throw new Error('Estrutura de resposta da API inválida ou sobre não encontrado');
        }
    })
    .catch(error => console.error('Erro ao obter dados:', error));

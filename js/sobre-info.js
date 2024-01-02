 // Extract the movie slug from the URL parameters
 const urlParams = new URLSearchParams(window.location.search);
 const sobreSlug = urlParams.get('slug');
 console.log('Sobre Slug:', sobreSlug);

 // Fetch data from the API using the extracted slug
 const url = `https://api.cosmicjs.com/v3/buckets/fita-production/objects/65789d5bd4352285f90e09e4?read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,`;
 console.log(url);

 fetch(url)
     .then(response => {
         if (!response.ok) {
             throw new Error(`HTTP error! Status: ${response.status}`);
         }
         return response.json();
     })
     .then(data => {
         console.log('API Response:', data);

         // Check if the data has the expected structure
         if (data.object && data.object.metadata) {
             const sobreData = data.object.metadata;

             // Update movie details on the page
             document.getElementById('sobre-details-titulo').textContent = sobreData.titulo;
             document.getElementById('sobre-details-conteudo').textContent = sobreData.conteudo;
         } else {
             throw new Error('Invalid API response structure or movie not found');
         }
     })
     .catch(error => console.error('Error fetching data:', error));
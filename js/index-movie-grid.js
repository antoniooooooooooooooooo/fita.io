
    
fetch('https://api.cosmicjs.com/v3/buckets/fita-production/objects?pretty=true&query=%7B%22type%22:%22movies%22%7D&limit=200&read_key=nMpklsOUy4PFd7cy1DtpXwvKDAst2IXyCGC4I4x2cDynYnbkUF&depth=1&props=slug,title,metadata,id,')
    .then(response => response.json())
    .then(data => {
        // Reference to the grid container
        const gridContainer = document.querySelector('.grid-container');

        // Loop through each movie and create a grid item
        data.objects.forEach(movie => {
            // Check if the movie is for this week (semana is true)
            if (movie.metadata.semana === true) {
                // Create a grid item
                const gridItem = document.createElement('div');
                gridItem.className = 'grid-item';

                // Create a link to the movie details page
                const movieLink = document.createElement('a');
                movieLink.href = `individual.html?slug=${movie.id}`; // Pass the movie slug as a query parameter
                movieLink.innerHTML = `<img src="${movie.metadata.photo.url}"  alt="${movie.title}">`;

                // Append the link to the grid item
                gridItem.appendChild(movieLink);

                // Append the grid item to the grid container
                gridContainer.appendChild(gridItem);
            }
        });
    })
    .catch(error => console.error('Error fetching data:', error));

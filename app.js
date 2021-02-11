const searchBtn = document.querySelector('.btn-search');
searchBtn.addEventListener('click', function(e) {
    const searchInput = document.querySelector('.search-input').value
    console.log(searchInput);
    fetch(`https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/total?country=${searchInput}`, {
            "method": "GET",
            "headers": {
                "x-rapidapi-key": "3051b9feb0msh3540ad6d504e43dp155546jsna09271966dbf",
                "x-rapidapi-host": "covid-19-coronavirus-statistics.p.rapidapi.com"
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            if (data.message === "Country not found. Returning global stats. Please use a country name found in the data property.") {
                const notFount = document.querySelector('.not-found');
                notFount.style.display = 'block';
            } else {
                const searchResults = document.querySelector('.search-results');
                searchResults.innerHTML = `<div class="found-result">
            <h2>Current Covid Info For <span class="country-name">${searchInput}</span></h2>
            <div class="search-info">
                <div class="search-left">
                    <h5 class="found-info"><i class="fas fa-notes-medical"></i>Total Effected: ${data.data.confirmed}</h5>
                    <h5 class="found-info"><i class="fas fa-notes-medical"></i>Total Recovered: ${data.data.recovered}</h5>
                </div>
                <div class="search-right">
                    <h5 class="found-info"><i class="fas fa-notes-medical"></i>Total Death: ${data.data.deaths}</h5>
                    <h5 class="found-info"><i class=" fas fa-notes-medical "></i>Location: ${data.data.location}</h5>
                </div>
            </div>
            <h3><i class="fas fa-clock"></i> Reported time: ${data.data.lastReported}</h3>
        </div>`
            }

            const defaultText = document.querySelector('.landingtext');
            defaultText.style.display = 'none';
        })
        .catch(err => {
            console.error(err);
        });

})
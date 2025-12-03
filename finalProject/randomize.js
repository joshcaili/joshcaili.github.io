const BASE_URL = 'https://api.jikan.moe/v4';
let contentWrapper; 
let titleElement; 

const fetchAnime = async (endpoint) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url);
        
        if (!response.ok) {  // checking if the api even connected at all
            if (response.status === 429) {
                throw new Error('Rate limit exceeded. Please wait a moment before trying again.');
            }
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || data; // return object's data if successful
    } 
    catch (error) {           // if api connected & bad response
        alert(`Error fetching ${title}: ${error.message}. Please try again later.`);
        
        contentWrapper = document.getElementById('anime-content-wrapper');
        if (contentWrapper) {
            contentWrapper.innerHTML = `
                <div class="alert alert-danger text-center mt-5" role="alert">
                    <h2>Error</h2>
                    <p>Could not load anime data: ${error.message}. Please try again later.</p>
                </div>
            `;
        }
        return [];
    }
};

const fetchFiveRandomAnime = async () => {
    const randomAnimeList = [];
    const maxFetches = 5;

    for (let i = 0; i < maxFetches; i++) {
        // Since /random/anime only returns one result, we loop to get 5.
        const anime = await fetchAnime('/random/anime?sfw=true');
        // The API returns the single anime object directly in the root of 'data'
        if (anime && anime.mal_id) { 
            randomAnimeList.push(anime);
        }
    }
    return randomAnimeList;
};

const generateAnimeCard = (anime) => {
    let imageUrl;

    if (anime.images && anime.images.jpg && anime.images.jpg.image_url) {  
        imageUrl = anime.images.jpg.image_url; 
    } else { 
        imageUrl = 'https://placehold.co/225x320/cccccc/333333?text=No+Image';
    }
    const title = anime.title || 'Untitled Anime';
    
    // Convert to Bootstrap Card Structure for LIST VIEW
    return `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100 shadow-sm rounded-3 overflow-hidden text-center">
                
                <!-- Card Image Top -->
                <div class="card-img-top-list bg-light" 
                     style="background-image: url('${imageUrl}'); 
                            background-size: cover; 
                            background-position: center;
                            height: 320px;">
                </div>

                <!-- Card Body for Title and Link -->
                <div class="card-body p-3">
                    <p class="card-title fw-bold text-truncate" title="${title}">
                        ${title}
                    </p>
                    <span class="badge ${anime.score && anime.score < 6 ? 'bg-danger' : 'bg-primary'} mt-1">
                        Score: ${anime.score || 'N/A'}
                    </span>
                    <a href="${anime.url}" target="_blank" class="btn btn-sm btn-outline-success mt-2">View on MAL</a>
                </div>
            </div>
        </div>
    `;
};


const renderContent = async () => {
    contentWrapper = document.getElementById('anime-content-wrapper');
    titleElement = document.getElementById('main-title');

    let animeList = await fetchFiveRandomAnime();
    // SORTING LOGIC: WORST FIRST because we want to watch the worst random show
    animeList.sort((a, b) => {
        const scoreA = a.score;
        const scoreB = b.score;

        if (scoreA < scoreB) {  // values are not returned for main program use. Sort uses the conditional to directly modify array
            return -1; 
        } else if (scoreA > scoreB) {
            return 1; 
        } else {
            return 0;
        }
    });
                                                                                                                                                                                                                                                                                                                                                                                                             
    const animeCardsHtml = animeList.map(generateAnimeCard).join('');
    contentWrapper.innerHTML = `
        <div class="row g-4 justify-content-center">
            ${animeCardsHtml}
        </div>
    `;

};
renderContent();
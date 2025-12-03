const BASE_URL = 'https://api.jikan.moe/v4';
let renderedView = 'popular';  // default title is set to popular since that's the home page view
let contentWrapper;
let titleElement;
let searchInput;

const fetchAnime = async (endpoint) => {
    try {
        const url = `${BASE_URL}${endpoint}`;
        const response = await fetch(url);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        return data.data || data; // return object's data if successful
    } 
    catch (error) {           //else give an error
        alert(`Error fetching ${title}: ${error.message}. Please try again later.`);
        contentWrapper.innerHTML = `<div class="alert alert-danger" role="alert"><h2>Error</h2><p>Could not load anime data. Please try again later. Check the console for details.</p></div>`;
        return [];
    }
};

const getPopularAnime = async () => fetchAnime('/top/anime?filter=bypopularity');
const getAiringAnime = async () => fetchAnime('/top/anime?filter=airing');
const getUpcomingAnime = async () => fetchAnime('/top/anime?filter=upcoming');
const searchAnime = async (query) => fetchAnime(`/anime?q=${query}&limit=20`);

const generateAnimeCard = (anime) => {  //take the images, titles, urls from myanimelist put it in a single card
    let imageUrl;

    if (anime.images && anime.images.jpg && anime.images.jpg.image_url) {  
        imageUrl = anime.images.jpg.image_url; 
    } else {  // handle if image for anime for some reason doesn't exist
        imageUrl = 'https://placehold.co/225x320/cccccc/333333?text=No+Image';
    }
    title = anime.title || 'Untitled Anime';
    
    // Convert to Bootstrap Card Structure
    return `
        <div class="col-xl-2 col-lg-3 col-md-4 col-sm-6 mb-4">
            <div class="card h-100 shadow-sm rounded-3 overflow-hidden text-center">
                
                <!-- Card Image Top -->
                <div class="card-img-top bg-light" 
                     style="background-image: url('${imageUrl}'); 
                            background-size: cover; 
                            background-position: center; 
                            height: 320px; 
                            width: 100%;">
                </div>

                <!-- Card Body for Title and Link -->
                <div class="card-body p-3">
                    <p class="card-title fw-bold text-truncate" title="${title}">
                        ${title}
                    </p>
                    <a href="${anime.url}" target="_blank" class="btn btn-sm btn-outline-success mt-2">View on MAL</a>
                </div>
            </div>
        </div>
    `;
};

const renderContent = async () => {
    contentWrapper = document.getElementById('anime-content-wrapper');
    titleElement = document.getElementById('main-title');

    let animeList = [];   //collection of objects returned by the api call
    let viewTitle = '';
    
    if (renderedView === 'popular') {
        animeList = await getPopularAnime();   //animelist will always populate for these 3 categories
        viewTitle = 'Popular Anime';
    } else if (renderedView === 'airing') {
        animeList = await getAiringAnime();
        viewTitle = 'Airing Anime';
    } else if (renderedView === 'upcoming') {
        animeList = await getUpcomingAnime();
        viewTitle = 'Upcoming Anime';
    } else if (renderedView.startsWith('search:')) {  // assuming search finds something. then fill list with those results
        const query = renderedView.substring(7);
        animeList = await searchAnime(query);
        viewTitle = `Search Results for "${query}"`;

        if (animeList.length === 0) {    // searching could have 0 in animeList if nothing is found.
            // empty results for searches
            contentWrapper.innerHTML = `<div class="alert alert-info text-center">No anime found matching your search query.</div>`;
        }
    }

    titleElement.textContent = viewTitle;
    const animeCardsHtml = animeList.map(generateAnimeCard).join('');  // combine all the individual cards together
    contentWrapper.innerHTML = `
        <div class="row g-4">
            ${animeCardsHtml}
        </div>
    `;
};

const btnPopular = document.getElementById('btn-popular');
const btnAiring = document.getElementById('btn-airing');
const btnUpcoming = document.getElementById('btn-upcoming');
const btnSearch = document.getElementById('btn-search');
searchInput = document.getElementById('search-input'); 

btnPopular.onclick = function() {
    renderedView = 'popular';
    renderContent();
};

btnAiring.onclick = function() {
    renderedView = 'airing';
    renderContent();
};

btnUpcoming.onclick = function() {
    renderedView = 'upcoming';
    renderContent();
};

btnSearch.onclick = function () {
    const query = searchInput.value.trim(); //chose trim if people mistakenly put extra spaces
    if (query) {
        renderedView = `search:${query}`;
        renderContent();
    }
}


renderContent();
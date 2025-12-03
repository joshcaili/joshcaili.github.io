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
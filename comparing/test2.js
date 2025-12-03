const getPopularAnime = async () => {
    try {
        const url = 'https://api.jikan.moe/v4/top/anime?filter=bypopularity';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching popular anime:', error);
        
        return [];
    }
};

const getAiringAnime = async () => {
    try {
        const url = 'https://api.jikan.moe/v4/top/anime?filter=airing';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching airing anime:', error);
        return [];
    }
};

const getUpcomingAnime = async () => {
    try {
        const url = 'https://api.jikan.moe/v4/top/anime?filter=upcoming';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching upcoming anime:', error);
        return [];
    }
};

const searchAnime = async (query) => {
    try {
        const url = `https://api.jikan.moe/v4/anime?q=${query}&limit=20`;
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error(`Error searching for "${query}":`, error);
        return [];
    }
};

const getRandomAnime = async () => {
    try {
        const url = 'https://api.jikan.moe/v4/random/anime';
        const response = await fetch(url);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data.data || data;
    } catch (error) {
        console.error('Error fetching random anime:', error);
        return [];
    }
};
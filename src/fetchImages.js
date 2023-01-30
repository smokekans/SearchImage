import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '33210195-55532a6eed5f942a9f206b283';
const filter = 'image_type=photo&orientation=horizontal&safesearch=true';

export async function fetchImages(query, page, per_page) {
    try {
        const response = await axios.get(`${BASE_URL}?&key=${API_KEY}&q=${query}&${filter}&page=${page}&per_page=${per_page}`);
        const data = response.data;
        return data;
    } catch (error) {
        console.error(error);
    }
};

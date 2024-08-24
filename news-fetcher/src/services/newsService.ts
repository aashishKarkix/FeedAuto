import axios from 'axios';
import {FLASK_API_URL} from '../config/config';
import logger from "../utils/logger";

interface NewsItem {
    title: string,
    url: string,
    author: string,
    image: string,
    content: string,
}

interface NewsResponse {
    news: NewsItem[];
}

export const getNews = async (): Promise<NewsItem[]> => {
    try {
        logger.info('Fetching news from Flask API...');
        const response = await axios.get<NewsResponse>(`${FLASK_API_URL}/scrape`);
        logger.info('Successfully fetched news from Flask API');
        return response.data.news;
    } catch (error) {
        logger.error('Error fetching news from Flask API:', error);
        throw new Error('Error fetching news from Flask API');
        }
};

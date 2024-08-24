import {Request, Response} from 'express';
import {getNews} from '../services/newsService';
import logger from '../utils/logger';

export const fetchNews = async (req: Request, res: Response): Promise<void> => {
    try {
        logger.info('Received request to fetch news');
        const news = await getNews();
        res.json({news});
    } catch (error) {
        logger.error('Error in fetchNews controller:', error);
        res.status(500).json({message: 'Error fetching news'});
    }
};

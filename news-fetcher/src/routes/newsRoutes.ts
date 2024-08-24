import express from 'express';
import {fetchNews} from '../controller/newsController';

const router = express.Router();

router.get('/', fetchNews);

export default router;
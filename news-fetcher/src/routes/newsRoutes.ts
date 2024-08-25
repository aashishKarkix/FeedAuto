import express, {Request, Response} from 'express';
import {fetchNews} from '../controller/newsController';
import {FacebookAuthService} from "../facebook/services/oAuth";

const router = express.Router();

router.get('/', fetchNews);

router.get('/auth/facebook', (req: Request, res: Response) => {
    const authUrl = FacebookAuthService.getAuthUrl();
    res.redirect(authUrl);
});

router.get('/auth/facebook/callback', async (req: Request, res: Response) => {
    const {code} = req.query;

    if (!code || typeof code !== 'string') {
        return res.status(400).send('Authorization code is missing or invalid');
    }

    try {
        const accessToken = await FacebookAuthService.getAccessToken(code);
        console.log('Access Token:', accessToken);

        res.send(`Access Token: ${accessToken}`);
    } catch (error) {
        console.error('Error exchanging code for access token:', error);
        res.status(500).send('An error occurred while exchanging the code for an access token');
    }
});

export default router;
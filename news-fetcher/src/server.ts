import app from './app';
import { config } from 'dotenv';
import https from 'https';
import fs from 'fs';

config();

const PORT = process.env.PORT || 3000;

/*creating this just to simulate https due to facebook redirect policies*/
const options = {
    key: fs.readFileSync('/Users/aashish/Desktop/projects/news-project/server.key'),
    cert: fs.readFileSync('/Users/aashish/Desktop/projects/news-project/server.cert'),
};

https.createServer(options,app).listen(PORT, () => {
    console.log(`HTTPS server running on https://localhost:${PORT}`);
});

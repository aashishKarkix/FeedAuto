import {config} from 'dotenv';

config();

export const FLASK_API_URL = process.env.FLASK_APIURL || 'http://localhost:5001'
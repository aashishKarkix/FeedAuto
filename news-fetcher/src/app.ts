import express, {Request, Response, NextFunction} from "express";
import newsRoutes from './routes/newsRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

app.use(express.json());

app.use(newsRoutes);

app.use(errorHandler);

export default app;
import express from 'express';
import { globalJoin, globalLogin } from '../controllers/userControllers';
import { globalTrending, globalSearch } from '../controllers/videosControllers';

const globalRouter = express.Router();

globalRouter.get('/', globalTrending);
globalRouter.get('/join', globalJoin);
globalRouter.get('/login', globalLogin);
globalRouter.get('/search', globalSearch);

export default globalRouter;

import express from 'express';
import { globalJoin, globalLogin } from '../controllers/userControllers';
import { globalHome, globalSearch } from '../controllers/videosControllers';

const globalRouter = express.Router();

globalRouter.get('/', globalHome);
globalRouter.get('/join', globalJoin);
globalRouter.get('/login', globalLogin);
globalRouter.get('/search', globalSearch);

export default globalRouter;

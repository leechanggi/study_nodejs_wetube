import express from 'express';
import { globalJoin, globalLogin } from '../controllers/userControllers';
import { globalApp, globalSearch } from '../controllers/videosControllers';

const globalRouter = express.Router();

globalRouter.get('/', globalApp);
globalRouter.get('/join', globalJoin);
globalRouter.get('/login', globalLogin);
globalRouter.get('/search', globalSearch);

export default globalRouter;

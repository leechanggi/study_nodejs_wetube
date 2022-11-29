import express from 'express';
import { globalTrending } from '../controllers/videosControllers';
import { globaljoin } from '../controllers/userControllers';

const globalRouter = express.Router();

globalRouter.get('/', globalTrending);
globalRouter.get('/join', globaljoin);

export default globalRouter;

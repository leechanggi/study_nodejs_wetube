import express from 'express';
import { rootJoin, rootLogin, postRootJoin, postRootLogin } from '../controllers/userControllers';
import { rootHome, rootSearch } from '../controllers/videosControllers';
import { publicOnlyMiddleware } from '../middlewares';

const rootRouter = express.Router();

rootRouter.get('/', rootHome);
rootRouter.route('/join').all(publicOnlyMiddleware).get(rootJoin).post(postRootJoin);
rootRouter.route('/login').all(publicOnlyMiddleware).get(rootLogin).post(postRootLogin);
rootRouter.get('/search', rootSearch);

export default rootRouter;

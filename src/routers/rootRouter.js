import express from 'express';
import { rootJoin, rootLogin, postRootJoin, postRootLogin } from '../controllers/userControllers';
import { rootHome, rootSearch } from '../controllers/videosControllers';

const rootRouter = express.Router();

rootRouter.get('/', rootHome);
rootRouter.route('/join').get(rootJoin).post(postRootJoin);
rootRouter.route('/login').get(rootLogin).post(postRootLogin);
rootRouter.get('/search', rootSearch);

export default rootRouter;

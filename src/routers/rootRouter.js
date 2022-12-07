import express from 'express';
import { rootJoin, rootLogin, postRootJoin } from '../controllers/userControllers';
import { rootHome, rootSearch } from '../controllers/videosControllers';

const rootRouter = express.Router();

rootRouter.get('/', rootHome);
rootRouter.route('/join').get(rootJoin).post(postRootJoin);
rootRouter.get('/login', rootLogin);
rootRouter.get('/search', rootSearch);

export default rootRouter;

import express from 'express';
import { videoWatch, videoEdit } from '../controllers/videosControllers';

const videosRouter = express.Router();

videosRouter.get('/watch', videoWatch);
videosRouter.get('/edit', videoEdit);

export default videosRouter;

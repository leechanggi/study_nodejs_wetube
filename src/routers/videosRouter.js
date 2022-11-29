import express from 'express';
import { videoUpload, videoWatch, videoEdit, videoRemove } from '../controllers/videosControllers';

const videosRouter = express.Router();

videosRouter.get('/upload', videoUpload);
videosRouter.get('/:id(\\d+)/', videoWatch);
videosRouter.get('/:id(\\d+)/edit', videoEdit);
videosRouter.get('/:id(\\d+)/remove', videoRemove);

export default videosRouter;

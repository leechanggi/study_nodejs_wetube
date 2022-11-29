import express from 'express';
import { videoUpload, videoWatch, videoEdit, videoRemove } from '../controllers/videosControllers';

const videosRouter = express.Router();

videosRouter.get('/upload', videoUpload);
videosRouter.get('/:id', videoWatch);
videosRouter.get('/:id/edit', videoEdit);
videosRouter.get('/:id/remove', videoRemove);

export default videosRouter;

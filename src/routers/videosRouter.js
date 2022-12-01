import express from 'express';
import { videoUpload, videoWatch, videoEdit, videoRemove, postVideoEdit } from '../controllers/videosControllers';

const videosRouter = express.Router();

videosRouter.get('/upload', videoUpload);
videosRouter.get('/:id(\\d+)/', videoWatch);
videosRouter.route('/:id(\\d+)/edit').get(videoEdit).post(postVideoEdit);
videosRouter.get('/:id(\\d+)/remove', videoRemove);

export default videosRouter;

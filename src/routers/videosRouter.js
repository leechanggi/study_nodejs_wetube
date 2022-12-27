import express from 'express';
import { videoUpload, videoWatch, videoEdit, videoRemove, postVideoUpload, postVideoEdit } from '../controllers/videosControllers';
import { protectorMiddleware } from '../middlewares';

const videosRouter = express.Router();

videosRouter.route('/upload').all(protectorMiddleware).get(videoUpload).post(postVideoUpload);
videosRouter.get('/:id([0-9a-f]{24})/', videoWatch);
videosRouter.route('/:id([0-9a-f]{24})/edit').all(protectorMiddleware).get(videoEdit).post(postVideoEdit);
videosRouter.route('/:id([0-9a-f]{24})/remove').all(protectorMiddleware).get(videoRemove);

export default videosRouter;

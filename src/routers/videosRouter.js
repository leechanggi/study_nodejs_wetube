import express from 'express';
import { videoUpload, videoWatch, videoEdit, videoRemove, postVideoUpload, postVideoEdit } from '../controllers/videosControllers';

const videosRouter = express.Router();

videosRouter.route('/upload').get(videoUpload).post(postVideoUpload);
videosRouter.get('/:id([0-9a-f]{24})/', videoWatch);
videosRouter.route('/:id([0-9a-f]{24})/edit').get(videoEdit).post(postVideoEdit);
videosRouter.route('/:id([0-9a-f]{24})/remove').get(videoRemove);

export default videosRouter;

import express from 'express';
import { postRegisterView } from '../controllers/videosControllers';

const apiRouter = express.Router();

apiRouter.post('/videos/:id([0-9a-f]{24})/view', postRegisterView);

export default apiRouter;

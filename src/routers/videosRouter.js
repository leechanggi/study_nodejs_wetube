import express from 'express';

const videosRouter = express.Router();

const handleWathchVideos = (req, res) => {
  res.send('/videos/watch');
};
videosRouter.get('/watch', handleWathchVideos);

export default videosRouter;

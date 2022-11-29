import express from 'express';
import morgan from 'morgan';

const PORT = 4000;
const app = express();
const logger = morgan('dev');

const globalRouter = express.Router();
const userRouter = express.Router();
const videosRouter = express.Router();

const handleHome = (req, res) => {
  res.send('Home');
};
const handleEditUser = (req, res) => {
  res.send('Edit user');
};
const handleWathchVideos = (req, res) => {
  res.send('Watch Video');
};

const handleListening = () => {
  console.log(`Server listenting on port http://localhost:${PORT}`);
};

app.use(logger);

app.use('/', globalRouter);
app.use('/videos', videosRouter);
app.use('/user', userRouter);

globalRouter.get('/', handleHome);
userRouter.get('/edit', handleEditUser);
videosRouter.get('/watch', handleWathchVideos);

app.listen(PORT, handleListening);

import express from 'express';
import morgan from 'morgan';
import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videosRouter from './routers/videosRouter';

const PORT = 4000;
const app = express();
const logger = morgan('dev');

const handleListening = () => {
  console.log(`Server listenting on port http://localhost:${PORT}`);
};

/** Middleware */
app.use(logger);

/** Router */
app.use('/', globalRouter);
app.use('/videos', videosRouter);
app.use('/user', userRouter);

app.listen(PORT, handleListening);

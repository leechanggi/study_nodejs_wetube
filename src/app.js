import express from 'express';
import morgan from 'morgan';

import globalRouter from './routers/globalRouter';
import userRouter from './routers/userRouter';
import videosRouter from './routers/videosRouter';

const app = express();
const logger = morgan('dev');

/** Express setting */
app.set('x-powered-by', false);
app.set('views', process.cwd() + '/src/views');
app.set('view engine', 'pug');

/** Middleware */
app.use(logger);
app.use(express.urlencoded({ extended: true }));

/** Router */
app.use('/', globalRouter);
app.use('/videos', videosRouter);
app.use('/user', userRouter);

export default app;

import express from 'express';
import morgan from 'morgan';
import session from 'express-session';

import rootRouter from './routers/rootRouter';
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
app.use(
  session({
    secret: 'Hello!',
    resave: true,
    saveUninitialized: true,
    // cookie: { secure: true },
  })
);

/** Router */
app.use('/', rootRouter);
app.use('/videos', videosRouter);
app.use('/user', userRouter);

export default app;

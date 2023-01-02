import express from 'express';
import morgan from 'morgan';
import session from 'express-session';
import MongoStore from 'connect-mongo';

import rootRouter from './routers/rootRouter';
import userRouter from './routers/userRouter';
import videosRouter from './routers/videosRouter';
import { localsMiddleware } from './middlewares';

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
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 3600000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }),
  })
);

app.use(localsMiddleware);

/** Router */
app.use('/uploads', express.static('uploads'));
app.use('/assets', express.static('assets'));
app.use('/', rootRouter);
app.use('/videos', videosRouter);
app.use('/user', userRouter);

export default app;

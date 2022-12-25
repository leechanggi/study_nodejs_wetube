import express from 'express';
import { userEdit, userRemove, userLogout, userWatch, startGithubLogin, finishGithubLogin } from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get('/logout', userLogout);
userRouter.get('/edit', userEdit);
userRouter.get('/remove', userRemove);
userRouter.get('/github/start', startGithubLogin);
userRouter.get('/github/finish', finishGithubLogin);

userRouter.get('/:id', userWatch);

export default userRouter;

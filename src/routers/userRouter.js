import express from 'express';
import {
  userEdit,
  userEditPassword,
  userRemove,
  userLogout,
  userProfile,
  startGithubLogin,
  finishGithubLogin,
  postUserEdit,
  postUserEditPassword,
} from '../controllers/userControllers';
import { protectorMiddleware, publicOnlyMiddleware, avatarUploadMiddleware } from '../middlewares';

const userRouter = express.Router();

userRouter.get('/logout', protectorMiddleware, userLogout);
userRouter
  .route('/edit')
  .all(protectorMiddleware)
  .get(userEdit)
  .post(avatarUploadMiddleware.single('avatar'), postUserEdit);
userRouter
  .route('/editpassword')
  .all(protectorMiddleware)
  .get(userEditPassword)
  .post(postUserEditPassword);
userRouter.get('/remove', userRemove);
userRouter.get('/github/start', publicOnlyMiddleware, startGithubLogin);
userRouter.get('/github/finish', publicOnlyMiddleware, finishGithubLogin);
userRouter.get('/:id', userProfile);

export default userRouter;

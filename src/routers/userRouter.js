import express from 'express';

export const userRouter = express.Router();

const handleEditUser = (req, res) => {
  res.send('/users/edit');
};
userRouter.get('/edit', handleEditUser);

export default userRouter;

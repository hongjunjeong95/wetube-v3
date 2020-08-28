import express from 'express';
import routes from '../routes';
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
} from '../controller/userController';
import { uploadAvatar } from '../middlewares';

const userRouter = express.Router();

userRouter.get(routes.userDetail, userDetail);

// Ediit Profile
userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, uploadAvatar, postEditProfile);

userRouter.get(routes.changePassword, changePassword);

export default userRouter;

import express from 'express';
import routes from '../routes';
import {
  userDetail,
  getEditProfile,
  postEditProfile,
  getChangePassword,
  postChangePassword,
} from '../controller/userController';
import { uploadAvatar } from '../middlewares';

const userRouter = express.Router();

// Ediit Profile
userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, uploadAvatar, postEditProfile);

// Change password
userRouter.get(routes.changePassword, getChangePassword);
userRouter.post(routes.changePassword, postChangePassword);

userRouter.get(routes.userDetail(), userDetail);

export default userRouter;

import express from 'express';
import routes from '../routes';
import { home, search } from '../controller/videoController';
import {
  logout,
  getJoin,
  postJoin,
  postLogin,
  getLogin,
  getMe,
} from '../controller/userController';
import { uploadAvatar } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, getMe);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, uploadAvatar, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;

import express from 'express';
import routes from '../routes';
import { home, search } from '../controller/videoController';
import { logout, login, getJoin, postJoin } from '../controller/userController';
import { uploadAvatar } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, uploadAvatar, postJoin);

globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);

export default globalRouter;

import express from 'express';
import passport from 'passport';
import routes from '../routes';
import { home, search } from '../controller/videoController';
import {
  logout,
  getJoin,
  postJoin,
  postLogin,
  getLogin,
  getMe,
  githubLogin,
  githubLoginCallback,
  kakaoLogin,
  kakaoLoginCallback,
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

// Github
globalRouter.get(routes.github, githubLogin);
globalRouter.get(
  routes.githubCallback,
  passport.authenticate('github', { failureRedirect: routes.login }),
  githubLoginCallback
);

// Kakao
globalRouter.get(routes.kakao, kakaoLogin);
globalRouter.get(
  routes.kakaoCallback,
  passport.authenticate('kakao', { failureRedirect: routes.login }),
  kakaoLoginCallback
);

globalRouter.get(routes.logout, logout);

export default globalRouter;

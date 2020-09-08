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
import { uploadAvatar, onlyPrivate, onlyPublic } from '../middlewares';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);
globalRouter.get(routes.me, onlyPrivate, getMe);

// Join
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, uploadAvatar, postJoin, postLogin);

// Loing
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

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

globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;

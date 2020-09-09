import passport from 'passport';
import GitHubStrategy from 'passport-github';
import KakaoStrategy from 'passport-kakao';

import routes from './routes';
import User from './models/User';
import { githubStrategy, kakaoStrategy } from './controller/userController';

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: process.env.PRODUCTION
        ? `https://wetube-v3.herokuapp.com${routes.githubCallback}`
        : `http://localhost:${process.env.PORT}${routes.githubCallback}`,
    },
    githubStrategy
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: process.env.PRODUCTION
        ? `https://wetube-v3.herokuapp.com${routes.kakaoCallback}`
        : `http://localhost:${process.env.PORT}${routes.kakaoCallback}`,
    },
    kakaoStrategy
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

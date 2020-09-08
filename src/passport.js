import passport from 'passport';
import GitHubStrategy from 'passport-github';
import KakaoStrategy from 'passport-kakao';
import User from './models/User';
import { githubStrategy, kakaoStrategy } from './controller/userController';

passport.use(User.createStrategy());

passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: 'http://localhost:5002/auth/github/callback',
    },
    githubStrategy
  )
);

passport.use(
  new KakaoStrategy(
    {
      clientID: process.env.KAKAO_ID,
      callbackURL: 'http://localhost:5002/auth/kakao/callback',
    },
    kakaoStrategy
  )
);

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

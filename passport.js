import passport from 'passport';
import GitHubStrategy from 'passport-github';
import User from './models/User';
import { githubStrategy } from './controller/userController';

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

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

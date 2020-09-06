import express from 'express';
import { join } from 'path';

import morgan from 'morgan';
import helmet from 'helmet';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import mongoose from 'mongoose';
import passport from 'passport';
import flash from 'express-flash';

import { localMiddleware } from './middlewares';
import routes from './routes';
import globalRouter from './router/globalRouter';
import userRouter from './router/userRouter';
import videoRouter from './router/videoRouter';

import './passport';
import csp from './csp';
import apiRouter from './router/apiRouter';

const app = express();
const CookieStore = MongoStore(session);

app.use(helmet());

app.set('view engine', 'pug');

app.use(csp);

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: new CookieStore({ mongooseConnection: mongoose.connection }),
  })
);

app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

app.use(morgan('dev'));
app.use(localMiddleware);

app.use('/static', express.static(join(__dirname, 'static')));
app.use('/uploads', express.static('uploads'));

app.use(routes.home, globalRouter);
app.use(routes.users, userRouter);
app.use(routes.videos, videoRouter);
app.use(routes.api, apiRouter);

export default app;

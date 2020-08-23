import dotenv from 'dotenv';
import routes from './routes';

dotenv.config();

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  next();
};

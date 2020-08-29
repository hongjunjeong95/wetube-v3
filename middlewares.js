import dotenv from 'dotenv';
import multer from 'multer';
import routes from './routes';

dotenv.config();

const multerAvatar = multer({ dest: 'uploads/avatar' });
const multerVideo = multer({ dest: 'uploads/video' });

export const uploadAvatar = multerAvatar.single('avatarFile');
export const uploadVideo = multerVideo.single('videoFile');

export const localMiddleware = (req, res, next) => {
  res.locals.siteName = 'WeTube';
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const onlyPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    res.redirect(routes.home);
  }
};

export const onlyPublic = (req, res, next) => {
  if (req.user) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

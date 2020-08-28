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
  res.locals.loggedUser = req.user;
  next();
};

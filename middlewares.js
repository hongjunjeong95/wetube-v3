import dotenv from 'dotenv';
import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';

import routes from './routes';

dotenv.config();

export const s3 = new aws.S3({
  accessKeyId: process.env.AWS_KEY,
  secretAccessKey: process.env.AWS_PRIVATE_KEY,
});

const multerVideo = multer({
  storage: multerS3({
    s3,
    bucket: 'wetube-v3/video',
    acl: 'public-read',
  }),
});

const multerAvatar = multer({
  storage: multerS3({
    s3,
    bucket: 'wetube-v3/avatar',
    acl: 'public-read',
  }),
});

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

import express from 'express';

import routes from '../routes';
import {
  videoDetail,
  deleteVideo,
  editVideo,
  getUpload,
  postUpload,
  getEditVideo,
  postEditVideo,
} from '../controller/videoController';
import { uploadVideo, onlyPrivate } from '../middlewares';

const videoRouter = express.Router();

// Upload
videoRouter.get(routes.upload, onlyPrivate, getUpload);
videoRouter.post(routes.upload, onlyPrivate, uploadVideo, postUpload);

videoRouter.get(routes.deleteVideo(), onlyPrivate, deleteVideo);

// EditVideo
videoRouter.get(routes.editVideo(), onlyPrivate, getEditVideo);
videoRouter.post(routes.editVideo(), onlyPrivate, postEditVideo);

videoRouter.get(routes.videoDetail(), videoDetail);

export default videoRouter;

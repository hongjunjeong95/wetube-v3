import express from 'express';

import routes from '../routes';
import {
  videoDetail,
  upload,
  deleteVideo,
  editVideo,
} from '../controller/videoController';

const videoRouter = express.Router();

videoRouter.get(routes.videoDetail, videoDetail);
videoRouter.get(routes.upload, upload);
videoRouter.get(routes.editVideo, editVideo);
videoRouter.get(routes.deleteVideo, deleteVideo);

export default videoRouter;

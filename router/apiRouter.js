import express from 'express';
import routes from '../routes';
import { postRegisterView } from '../controller/apiController';

const apiRouter = express.Router();

apiRouter.post(routes.registerView(), postRegisterView);

export default apiRouter;

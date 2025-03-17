import express from 'express';
import { connectionController, getAllUserController, getOnlyUserAndIdController } from '../controller/connectionController.js';

const defaultRoute = express.Router();
defaultRoute.get('/', connectionController);
defaultRoute.get('/display-users', getAllUserController);
defaultRoute.get('/display-only-username-id', getOnlyUserAndIdController);

export default defaultRoute;
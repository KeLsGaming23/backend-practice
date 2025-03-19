import express from 'express';
import { connectionController, getAllUsersController, getOnlyUserNameAndIDController } from '../controller/connectionController.js';

const defaultRoute = express.Router();

defaultRoute.get('/', connectionController);
defaultRoute.get('/display-users', getAllUsersController);
defaultRoute.get('/display-username-id', getOnlyUserNameAndIDController);

export default defaultRoute;
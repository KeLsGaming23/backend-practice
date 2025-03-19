import express from 'express';
import { connectionController, getAllUsersController, getOnlyUserNameAndIDController, getUserByIdController } from '../controller/connectionController.js';

const defaultRoute = express.Router();

defaultRoute.get('/', connectionController);
defaultRoute.get('/display-users', getAllUsersController);
defaultRoute.get('/display-username-id', getOnlyUserNameAndIDController);
defaultRoute.get('/display-by-id/:id', getUserByIdController);

export default defaultRoute;
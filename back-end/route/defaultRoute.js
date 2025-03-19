import express from 'express';
import { connectionController, getAllUsersController } from '../controller/connectionController.js';

const defaultRoute = express.Router();

defaultRoute.get('/', connectionController);
defaultRoute.get('/display-users', getAllUsersController);

export default defaultRoute;
import express from 'express';
import { connectionController, getAllUserController } from '../controller/connectionController.js';

const defaultRoute = express.Router();
defaultRoute.get('/', connectionController);
defaultRoute.get('/display-users', getAllUserController);

export default defaultRoute;
import express from 'express';
import { connectionController, getAllUserController, getOnlyUserAndIdController, getUserByIdController } from '../controller/connectionController.js';

const defaultRoute = express.Router();
defaultRoute.get('/', connectionController);
defaultRoute.get('/display-users', getAllUserController);
defaultRoute.get('/display-only-username-id', getOnlyUserAndIdController);
defaultRoute.get('/display-user-byid/:id', getUserByIdController);

export default defaultRoute;
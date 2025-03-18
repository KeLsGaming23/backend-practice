import express from 'express'
import { connectionController, getAllUsersController, getOnlyUserNameAndIdController } from '../controller/connectionController.js'

const defaultRoute = express.Router();
defaultRoute.get("/", connectionController);
defaultRoute.get("/display-users", getAllUsersController);
defaultRoute.get("/display-user-id", getOnlyUserNameAndIdController);

export default defaultRoute;

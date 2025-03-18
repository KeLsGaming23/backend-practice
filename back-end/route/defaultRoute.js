import express from 'express'
import { connectionController, getAllUsersController, getOnlyUserNameAndIdController, getUserByIdController } from '../controller/connectionController.js'

const defaultRoute = express.Router();
defaultRoute.get("/", connectionController);
defaultRoute.get("/display-users", getAllUsersController);
defaultRoute.get("/display-user-id", getOnlyUserNameAndIdController);
defaultRoute.get("/display-by-id/:id", getUserByIdController);

export default defaultRoute;

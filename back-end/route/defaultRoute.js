import express from 'express'
import { connectionController } from '../controller/connectionController.js';

const defaultRoute = express.Router();
defaultRoute.get('/', connectionController);

export default defaultRoute;
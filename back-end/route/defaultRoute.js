import express from 'express'
import { connectionController } from '../controller/connectionController'

const defaultRouter = express.Router();
router.get("/", connectionController);

export default defaultRouter;

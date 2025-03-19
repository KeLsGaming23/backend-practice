import express from 'express';
import postController from '../controller/postController.js';
import { registerUserController } from '../controller/userController.js';

const postRoute = express.Router();

postRoute.post('/create-post-entry', postController);
postRoute.post('/create-new-user', registerUserController);

export default postRoute;
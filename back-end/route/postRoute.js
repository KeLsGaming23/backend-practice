import express from "express";
import { postController } from "../controller/postController.js";

const postRoute = express.Router();
postRoute.post('/create-post', postController)

export default postRoute;
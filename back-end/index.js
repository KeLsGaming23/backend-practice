import express from 'express';
import cors from 'cors';
import "dotenv/config";
import defaultRoute from './route/defaultRoute.js';
import postRoute from './route/postRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', defaultRoute);
app.use('/api', postRoute);
app.listen(8800, ()=>{
    console.log("Connected to backend!");
})
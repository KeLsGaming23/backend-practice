import express from 'express';
import cors from 'cors';
import defaultRoute from './route/defaultRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', defaultRoute);

app.listen(8800, () => {
    console.log("Connected to database")
});
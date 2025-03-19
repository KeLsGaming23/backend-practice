import "dotenv/config";
import express from 'express';
import cors from 'cors';
import defaultRoute from "./route/defaultRoute.js";
import postRoute from "./route/postRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', defaultRoute);
app.use('/api', postRoute);

const PORT = 8800
app.listen(PORT, () => {
    console.log(`Server is running or port: ${PORT}`);
});
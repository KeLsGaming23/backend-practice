import "dotenv/config";
import express from 'express';
import cors from 'cors';
import defaultRoute from "./route/defaultRoute.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use('/', defaultRoute);

const PORT = 8800
app.listen(PORT, () => {
    console.log(`Server is running or port: ${PORT}`);
});
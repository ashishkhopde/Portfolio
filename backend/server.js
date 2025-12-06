import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB";

import projectRoute from "./routes/project.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/projects', projectRoute)

app.listen(process.env.PORT, () => {
    console.log("listening...");
});
import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";

import projectRoute from "./routes/project.routes.js"
import technologiesRoute from "./routes/technologies.routes.js"

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/projects', projectRoute);
app.use('/api/technologies', technologiesRoute);

app.listen(process.env.PORT, () => {
    console.log("listening...");
});
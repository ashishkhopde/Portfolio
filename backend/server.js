import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/connectDB.js";

import projectRoute from "./routes/project.routes.js";
import technologiesRoute from "./routes/technologies.routes.js";
import freelancingRoute from "./routes/freelancing.routes.js";
import contactRoute from "./routes/contact.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use('/api/projects', projectRoute);
app.use('/api/technologies', technologiesRoute);
app.use('/api/freelancing', freelancingRoute);
app.use('/api/contact', contactRoute);

app.listen(process.env.PORT, () => {
    console.log("listening...");
});
import { Router } from "express";
import { getAllProjects, addProject } from "../controllers/project.controller.js";

const router = Router();

router.get("/", getAllProjects);
router.post("/", addProject);

export default router;
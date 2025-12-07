import { Router } from "express";
import { getAllProjects, addProject, editProject, deleteProject } from "../controllers/project.controller.js";

const router = Router();

router.get("/", getAllProjects);
router.post("/", addProject);
router.put("/:id", editProject);
router.delete("/:id", deleteProject);

export default router;
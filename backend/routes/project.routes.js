import { Router } from "express";
import { getAllProjects, addProject, editProject, deleteProject } from "../controllers/project.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getAllProjects);
router.post("/", upload.single("image"), addProject);
router.put("/:id", upload.single("image"), editProject);
router.delete("/:id", deleteProject);

export default router;
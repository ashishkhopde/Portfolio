import { Router } from "express";
import { getTechnologies, createTechnology, editTechnology, deleteTechnology } from "../controllers/technologies.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getTechnologies);
router.post("/", upload.single("icon"), createTechnology);
router.put("/:id", upload.single("icon"), editTechnology);
router.delete("/:id", deleteTechnology);

export default router;
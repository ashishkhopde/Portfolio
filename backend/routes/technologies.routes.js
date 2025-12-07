import { Router } from "express";
import { getTechnologies, createTechnology, editTechnology, deleteTechnology } from "../controllers/technologies.controller.js";

const router = Router();

router.get("/", getTechnologies);
router.post("/", createTechnology);
router.put("/:id", editTechnology);
router.delete("/:id", deleteTechnology);

export default router;
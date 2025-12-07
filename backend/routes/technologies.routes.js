import { Router } from "express";
import { getTechnologies, createTechnology } from "../controllers/technologies.controller.js";

const router = Router();

router.get("/", getTechnologies);
router.post("/", createTechnology);

export default router;
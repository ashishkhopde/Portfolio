import { Router } from "express";
import { getFreelancingInfo, postFreelancingInfo } from "../controllers/freelancing.controller.js";

const router = Router();

router.get("/", getFreelancingInfo);
router.post("/", postFreelancingInfo);

export default router;
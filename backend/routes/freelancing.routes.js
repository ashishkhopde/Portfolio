import { Router } from "express";
import { getFreelancingInfo, postFreelancingInfo, editFreelancingInfo, deleteFreelancingInfo } from "../controllers/freelancing.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getFreelancingInfo);
router.post("/", postFreelancingInfo);
router.put("/:id", editFreelancingInfo);
router.delete("/:id", deleteFreelancingInfo);

export default router;
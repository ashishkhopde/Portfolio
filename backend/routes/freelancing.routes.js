import { Router } from "express";
import { getFreelancingInfo, postFreelancingInfo, editFreelancingInfo, deleteFreelancingInfo } from "../controllers/freelancing.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.get("/", getFreelancingInfo);
router.post("/", upload.single("image"), postFreelancingInfo);
router.put("/:id", upload.single("image"), editFreelancingInfo);
router.delete("/:id", deleteFreelancingInfo);

export default router;
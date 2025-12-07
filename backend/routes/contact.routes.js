import { Router } from "express";
import { getContact, postContact, deleteContact } from "../controllers/contact.controller.js";

const router = Router();

router.get("/", getContact);
router.post("/", postContact);
router.delete("/:id", deleteContact);

export default router;
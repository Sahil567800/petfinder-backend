import { addPetController } from "../controllers/petController.js";
import { upload } from "../middleware/multer.js";
import express from "express";

const router = express.Router()

router.post('/add', upload.single("image"), addPetController)

export default router
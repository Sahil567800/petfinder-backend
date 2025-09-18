import { addPetController,getAllPetsController ,getPetController,deletePetController} from "../controllers/petController.js";
import { upload } from "../middleware/multer.js";
import express from "express";

const router = express.Router()

router.get('/', getAllPetsController)
router.get('/:id', getPetController)
router.delete('/:id', deletePetController)
router.post('/add', upload.single("image"), addPetController)

export default router
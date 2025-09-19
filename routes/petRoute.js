import { addPetController,getAllPetsController ,getPetController,deletePetController, updatePetController} from "../controllers/petController.js";
import { upload } from "../middleware/multer.js";
import express from "express";

const router = express.Router()

router.get('/', getAllPetsController)
router.get('/:id', getPetController)
router.delete('/:id', deletePetController)
router.post('/', upload.single("image"), addPetController)
router.put('/:id',upload.single("image"),updatePetController)

export default router
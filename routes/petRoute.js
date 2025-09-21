import { addPetController,getAllPetsController ,getPetController,deletePetController, updatePetController} from "../controllers/petController.js";
import { upload } from "../middleware/multer.js";
import { authmiddleware } from "../middleware/authmiddleware.js";
import express from "express";

const router = express.Router()

router.get('/', getAllPetsController)
router.get('/:id', getPetController)
router.delete('/:id',authmiddleware, deletePetController)
router.post('/', authmiddleware,upload.single("image"), addPetController)
router.put('/:id',authmiddleware,upload.single("image"),updatePetController)

export default router
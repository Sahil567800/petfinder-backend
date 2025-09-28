import { addPetController,getAllPetsController ,getPetController,deletePetController, updatePetController} from "../controllers/petController.js";
import { upload } from "../middleware/multer.js";
import { authRoleMiddleware } from "../middleware/authmiddleware.js";
import express from "express";

const router = express.Router()

router.get('/', getAllPetsController)
router.get('/:id', getPetController)
router.delete('/:id',authRoleMiddleware(['seller']), deletePetController)
router.post('/', authRoleMiddleware(['seller']),upload.single("image"), addPetController)
router.put('/:id',authRoleMiddleware(['seller']),upload.single("image"),updatePetController)

export default router
import { orderController } from "../controllers/orderController.js";
import express from 'express';
import { authmiddleware } from "../middleware/authmiddleware.js";
const router = express.Router()

router.post('/',authmiddleware,orderController)

export default router

import { orderController ,sellerOrderController,allOrderController,myOrderController,orderUpdateStatusController} from "../controllers/orderController.js";
import express from 'express';
import {authRoleMiddleware } from "../middleware/authmiddleware.js";
const router = express.Router()

router.post('/',authRoleMiddleware(['buyer']),orderController)
router.post('/allOrders',authRoleMiddleware(['admin']),allOrderController)
router.get('/myOrders',authRoleMiddleware(['buyer']),myOrderController)
router.get('/:id',authRoleMiddleware(['seller']),sellerOrderController)                    
router.put('/:orderId/status',authRoleMiddleware(['seller']),orderUpdateStatusController)                    

export default router

import {forgotPasswordController, loginController,registerController,resetPasswordController} from "../controllers/userController.js";
import express from 'express';

const router =express.Router();

router.post('/register',registerController);
router.post('/login',loginController);
router.post('/forgot-password',forgotPasswordController);
router.post('/reset-password/:token',resetPasswordController)

export default router;


import express from 'express';
const router = express.Router();
import authController from '../controllers/authController.js';
import validate from '../middlewares/validateRequest.js';
import { adminLoginSchema } from '../utils/Validators.js';

router.post('/login', validate(adminLoginSchema), authController.login);
router.post('/logout', authController.logout);

export default router;

import express from 'express';
const router = express.Router();
import orderController from '../controllers/orderControllers.js';
import authMiddleware from '../middlewares/auth.js';
import multer from 'multer';
import path from 'path';
import { fileURLToPath } from "url";


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


// multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, path.join(__dirname, '..', 'uploads')),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const name = `${Date.now()}-${Math.round(Math.random()*1e9)}${ext}`;
    cb(null, name);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.match(/jpeg|png|jpg/)) return cb(new Error('Only .jpg and .png allowed'));
    cb(null, true);
  }
});

router.post('/', upload.single('productImage'), orderController.createOrder);
router.get('/', authMiddleware, orderController.getAllOrders); // admin only
router.get('/:id', authMiddleware, orderController.getOrder);
router.patch('/:id/quantity', authMiddleware, orderController.updateQuantity);
router.delete('/:id', authMiddleware, orderController.deleteOrder);

export default router;

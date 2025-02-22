import express from 'express';
import { uploadFile } from '../controllers/uploadController.js';
import { getProducts, search, getOrder } from '../controllers/productController.js';
import multer from 'multer';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.post('/upload', upload.single('image'), uploadFile);
router.get('/products', getProducts);
router.get('/search', search);
router.get('/order', getOrder);

export default router;
import { Router } from 'express';
import {
  getProducts, createProduct, updateProduct, deleteProduct,
  getProductById
} from '../controllers/products.controller';

const router = Router();

router.get('/:id', getProductById);
router.get('/', getProducts);
router.post('/', createProduct);
router.patch('/:id', updateProduct);
router.delete('/:id', deleteProduct);

export default router;

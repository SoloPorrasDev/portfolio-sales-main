import { Router } from 'express';
import {
  getDiscounts, createDiscount, updateDiscount, deleteDiscount,
  getDiscountById
} from '../controllers/discounts.controller';

const router = Router();

router.get('/:id', getDiscountById);
router.get('/', getDiscounts);
router.post('/', createDiscount);
router.patch('/:id', updateDiscount);
router.delete('/:id', deleteDiscount);

export default router;

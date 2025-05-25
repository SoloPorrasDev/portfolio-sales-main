import { Router } from 'express';
import {
  getSales, createSale, updateSale, deleteSale,
  getSaleById
} from '../controllers/sales.controller';

const router = Router();

router.get('/:id', getSaleById);
router.get('/', getSales);
router.post('/', createSale);
router.patch('/:id', updateSale);
router.delete('/:id', deleteSale);

export default router;

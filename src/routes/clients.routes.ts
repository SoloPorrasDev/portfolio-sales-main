import { Router } from 'express';
import {
  getClients, createClient, updateClient, deleteClient,
  getClientById
} from '../controllers/clients.controller';

const router = Router();

router.get('/:id', getClientById);
router.get('/', getClients);
router.post('/', createClient);
router.patch('/:id', updateClient);
router.delete('/:id', deleteClient);

export default router;

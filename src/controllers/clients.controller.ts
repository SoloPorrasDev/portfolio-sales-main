import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Client } from '../models/clients.model';
import clients from '../data/clients.data';

export const getClients = (req: Request & any, res: Response & any) => {
  const { filter } = req.query;
  const { tax_id } = JSON.parse(filter || '{}') || {};
  const foundClients = clients.filter((client) => {
    if (tax_id) {
      return !client._deleted && (client.tax_id.toLowerCase().includes(tax_id?.toLowerCase()));
    }
    return !client._deleted;
  });
  res.json(foundClients);
};

export const getClientById = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const foundClient = clients.find((client) => client.id === id && !client._deleted);
  if (!foundClient) res.status(404).json({ message: `Client not found with id ${id}` });
  res.json(foundClient);
};

export const createClient = (req: Request & any, res: Response & any) => {
  const id = uuidv4();
  const newClient: Client = {
    id,
    _deleted: false,
    ...req.body
  };
  if (clients.find((client) => client.tax_id === newClient.tax_id)) {
    res.status(400).json({ message: `Client with tax id: ${newClient.tax_id} already exists` });
  }
  clients.push(newClient);
  res.status(201).json(newClient);
};

export const updateClient = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Client not found with id ${id}` });
  clients[index] = { ...clients[index], ...req.body };
  res.json(clients[index]);
};

export const deleteClient = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = clients.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Client not found with id ${id}` });
  clients[index] = { ...clients[index], _deleted: true };
  res.status(204).send();
};

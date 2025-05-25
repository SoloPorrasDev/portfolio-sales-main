import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Sale } from '../models/sales.model';
import sales from '../data/sales.data';

export const getSales = (req: Request & any, res: Response & any) => {
  const { filter } = req.query;
  const { product_id } = JSON.parse(filter || '{}') || {};
  const foundSales = sales.filter((sale) => {
    if (product_id) {
      return !sale._deleted && (sale.products.includes(product_id));
    }
    return !sale._deleted;
  });
  res.json(foundSales);
};

export const getSaleById = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const foundSale = sales.find((sale) => sale.id === id && !sale._deleted);
  if (!foundSale) res.status(404).json({ message: `Sale not found with id ${id}` });
  res.json(foundSale);
};

export const createSale = (req: Request & any, res: Response & any) => {
  const id = uuidv4();
  const newSale: Sale = {
    id,
    _deleted: false,
    ...req.body
  };
  sales.push(newSale);
  res.status(201).json(newSale);
};

export const updateSale = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = sales.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Sale not found with id ${id}` });
  sales[index] = { ...sales[index], ...req.body };
  res.json(sales[index]);
};

export const deleteSale = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = sales.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Sale not found with id ${id}` });
  sales[index] = { ...sales[index], _deleted: true };
  res.status(204).send();
};

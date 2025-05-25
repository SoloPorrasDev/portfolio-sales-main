import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Discount } from '../models/discounts.model';
import discounts from '../data/discounts.data';
import { validateAddedProducts } from '../utils/discount-validations.util';

export const getDiscounts = (req: Request & any, res: Response & any) => {
  const { filter } = req.query;
  const { product_id } = JSON.parse(filter || '{}') || {};
  const foundDiscounts = discounts.filter((discount) => {
    if (product_id) {
      return !discount._deleted && (discount.products.includes(product_id));
    }
    return !discount._deleted;
  });
  res.json(foundDiscounts);
};

export const getDiscountById = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const foundDiscount = discounts.find((discount) => discount.id === id && !discount._deleted);
  if (!foundDiscount) res.status(404).json({ message: `Discount not found with id ${id}` });
  res.json(foundDiscount);
};

export const createDiscount = (req: Request & any, res: Response & any) => {
  const id = uuidv4();
  const newDiscount: Discount = {
    id,
    _deleted: false,
    ...req.body
  };
  if (!validateAddedProducts(newDiscount).isValid) {
    res.status(400).json({
      conflict_products: validateAddedProducts(newDiscount).conflict_products,
      message: validateAddedProducts(newDiscount).message
    });
  }
  discounts.push(newDiscount);
  res.status(201).json(newDiscount);
};

export const updateDiscount = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = discounts.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Discount not found with id ${id}` });
  discounts[index] = { ...discounts[index], ...req.body };
  res.json(discounts[index]);
};

export const deleteDiscount = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = discounts.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Discount not found with id ${id}` });
  discounts[index] = { ...discounts[index], _deleted: true };
  res.status(204).send();
};

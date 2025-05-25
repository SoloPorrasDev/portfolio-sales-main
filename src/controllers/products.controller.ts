import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Product } from '../models/products.model';
import products from '../data/products.data';

export const getProducts = (req: Request & any, res: Response & any) => {
  const { filter } = req.query;
  const { code, name } = JSON.parse(filter || '{}') || {};
  const foundProducts = products.filter((product) => {
    if (code || name) {
      return !product._deleted && (product.internal_code.toLowerCase().includes(code?.toLowerCase()) || product.name.toLowerCase().includes(name?.toLowerCase()));
    }
    return !product._deleted;
  });
  res.json(foundProducts);
};

export const getProductById = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const foundProduct = products.find((product) => product.id === id && !product._deleted);
  if (!foundProduct) res.status(404).json({ message: `Product not found with id ${id}` });
  res.json(foundProduct);
};

export const createProduct = (req: Request & any, res: Response & any) => {
  const id = uuidv4();
  const internal_code = req.body.internal_code ? req.body.internal_code : id.toString().slice(-6);
  const newProduct: Product = {
    id,
    internal_code,
    _deleted: false,
    ...req.body
  };
  if (products.find((product) => product.internal_code === newProduct.internal_code)) {
    res.status(400).json({ message: `Product with internal code: ${newProduct.internal_code} already exists` });
  }
  products.push(newProduct);
  res.status(201).json(newProduct);
};

export const updateProduct = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = products.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Product not found with id ${id}` });
  products[index] = { ...products[index], ...req.body };
  res.json(products[index]);
};

export const deleteProduct = (req: Request & any, res: Response & any) => {
  const { id } = req.params;
  const index = products.findIndex((c) => c.id === id);
  if (index === -1) return res.status(404).json({ message: `Product not found with id ${id}` });
  products[index] = { ...products[index], _deleted: true };
  res.status(204).send();
};

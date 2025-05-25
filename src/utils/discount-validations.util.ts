import { Discount } from '../models/discounts.model';
import discounts from '../data/discounts.data';

export const validateAddedProducts = (newDiscount: Discount): { isValid: boolean, conflict_products?: string[], message?: string } => {
  const existingProducts: string[] = [];

  discounts.forEach((discount) => {
    if (discount._deleted || discount.id === newDiscount.id) return;
    discount.products.forEach((product_id) => {
      existingProducts.push(product_id);
    })
  });

  const conflict_products = newDiscount.products.filter((pid) => existingProducts.includes(pid));
  const isValid = conflict_products.length === 0;
  const message = isValid ? undefined : 'Some product IDs are already associated with another discount.';

  return { isValid, conflict_products, message };
}

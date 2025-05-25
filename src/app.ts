import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import clientRoutes from './routes/clients.routes';
import productRoutes from './routes/products.routes';
import saleRoutes from './routes/sales.routes';
import discountRoutes from './routes/discounts.routes';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/clients', clientRoutes);
app.use('/api/products', productRoutes);
app.use('/api/sales', saleRoutes);
app.use('/api/discounts', discountRoutes);

export default app;

import express from 'express';
import cors from 'cors';
import categoryRoutes from './routes/category';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/categories', categoryRoutes);

export default app;
import express from 'express';
import cors from 'cors';
import expenseRoutes from './routes/expense';

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/expenses', expenseRoutes);

export default app;
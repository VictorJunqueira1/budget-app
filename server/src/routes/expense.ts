import { Router } from 'express';
import ExpenseModel from '../models/expense';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const expenses = await ExpenseModel.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching expenses' });
    }
});

router.post('/', async (req, res) => {
    const { category, subcategory, amount } = req.body;

    if (!category || !subcategory || amount === undefined) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const newExpense = new ExpenseModel({ category, subcategory, amount });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar despesa.' });
    }
});

router.put('/:id', async (req, res) => {
    const { id } = req.params;
    const { category, subcategory, amount } = req.body;
    try {
        const updatedExpense = await ExpenseModel.findByIdAndUpdate(id, { category, subcategory, amount }, { new: true });
        res.json(updatedExpense);
    } catch (error) {
        res.status(500).json({ message: 'Error updating expense' });
    }
});

router.delete('/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await ExpenseModel.findByIdAndDelete(id);
        res.json({ message: 'Expense deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting expense' });
    }
});

export default router;
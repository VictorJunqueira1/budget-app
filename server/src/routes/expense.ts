import { Router } from 'express';
import ExpenseModel from '../models/expense';

const router = Router();

router.get('/', async (req, res) => {
    try {
        const expenses = await ExpenseModel.find();
        res.json(expenses);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao buscar despesas.' });
    }
});

router.post('/', async (req, res) => {
    const { category, amount } = req.body;

    if (!category || !amount) {
        return res.status(400).json({ error: 'Preencha todos os campos.' });
    }

    try {
        const newExpense = new ExpenseModel({ category, amount });
        await newExpense.save();
        res.status(201).json(newExpense);
    } catch (error) {
        res.status(500).json({ error: 'Erro ao adicionar despesa.' });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await ExpenseModel.findByIdAndDelete(id);
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: 'Erro ao deletar despesa.' });
    }
});

export default router;
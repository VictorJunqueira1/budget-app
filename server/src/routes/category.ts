import express from 'express';
import { Request, Response } from 'express';
import { Category } from '../models/category';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        const categories = await Category.find({});
        res.status(200).json(categories);
    } catch (error) {
        console.error('Erro ao buscar categorias:', error);
        res.status(500).json({ message: 'Erro ao buscar categorias.' });
    }
});

router.post('/', async (req: Request, res: Response) => {
    const { name } = req.body;

    try {
        const category = new Category({ name });
        await category.save();
        res.status(201).json({ message: 'Categoria adicionada com sucesso.', category });
    } catch (error) {
        console.error('Erro ao adicionar a categoria:', error);
        res.status(500).json({ message: 'Erro ao adicionar a categoria.' });
    }
});

router.put('/:name', async (req: Request, res: Response) => {
    const { name } = req.params;
    const { newName } = req.body;

    try {
        const result = await Category.findOneAndUpdate(
            { name },
            { name: newName },
            { new: true }
        );

        if (!result) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        res.status(200).json({ message: 'Categoria atualizada com sucesso.', category: result });
    } catch (error) {
        console.error('Erro ao atualizar a categoria:', error);
        res.status(500).json({ message: 'Erro ao atualizar a categoria.' });
    }
});

router.delete('/:name', async (req: Request, res: Response) => {
    const { name } = req.params;

    try {
        const result = await Category.deleteOne({ name });

        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Categoria não encontrada.' });
        }

        res.status(200).json({ message: 'Categoria excluída com sucesso.' });
    } catch (error) {
        console.error('Erro ao excluir a categoria:', error);
        res.status(500).json({ message: 'Erro ao excluir a categoria.' });
    }
});

export default router;
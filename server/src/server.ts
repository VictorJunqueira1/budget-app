import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(bodyParser.json());

let categories: string[] = [];

// Rota para buscar categorias
app.get('/categories', (req: Request, res: Response) => {
    res.json(categories);
});

// Rota para adicionar ou editar categorias
app.post('/categories', (req: Request, res: Response) => {
    const { name } = req.body;

    console.log('Corpo da requisição POST:', req.body);

    if (!name) {
        return res.status(400).json({ error: 'O nome da categoria é obrigatório.' });
    }

    if (!categories.includes(name)) {
        categories.push(name);
    }
    res.json({ name });
});

// Rota para editar categorias
app.put('/categories/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    const { newName } = req.body;

    if (!newName || !name) {
        return res.status(400).json({ error: 'Nome da categoria inválido.' });
    }

    const index = categories.indexOf(name);
    if (index !== -1) {
        categories[index] = newName;
        res.json({ name: newName });
    } else {
        res.status(404).json({ error: 'Categoria não encontrada.' });
    }
});

// Rota para deletar uma categoria
app.delete('/categories/:name', (req: Request, res: Response) => {
    const { name } = req.params;
    categories = categories.filter(category => category !== name);
    res.sendStatus(204);
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
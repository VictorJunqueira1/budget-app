import mongoose from 'mongoose';
import app from './app';

// Conectar ao MongoDB
const MONGO_URI = 'mongodb://localhost:27017/budget-app';

mongoose.connect(MONGO_URI)
    .then(() => {
        console.log('Conectado ao MongoDB');
        app.listen(5000, () => {
            console.log('Servidor rodando na porta 5000');
        });
    })
    .catch((error) => {
        console.error('Erro ao conectar ao MongoDB:', error);
    });
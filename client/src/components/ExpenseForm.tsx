import { useState, useEffect } from 'react';

type ExpenseFormProps = {
    onSubmit: (expense: { category: string; amount: number }) => void;
    editExpense?: { category: string; amount: number } | null; // Permitir edição
};

const ExpenseForm = ({ onSubmit, editExpense }: ExpenseFormProps) => {
    const [category, setCategory] = useState<string>('');
    const [amount, setAmount] = useState<number>(0);

    useEffect(() => {
        if (editExpense) {
            setCategory(editExpense.category);
            setAmount(editExpense.amount);
        } else {
            setCategory('');
            setAmount(0);
        }
    }, [editExpense]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        onSubmit({ category, amount });
        setCategory('');
        setAmount(0);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md mb-6">
            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                {editExpense ? 'Editar Despesa' : 'Adicionar Despesa'}
            </h2>
            <input
                type="text"
                placeholder="Categoria"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
                type="number"
                placeholder="Valor"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                className="mb-4 p-3 border border-gray-300 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button type="submit" className="bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition duration-200">
                {editExpense ? 'Atualizar' : 'Adicionar'}
            </button>
        </form>
    );
};

export default ExpenseForm;
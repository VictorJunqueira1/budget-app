import React, { useState, useEffect } from 'react';

interface Expense {
    _id?: string;
    category: string;
    subcategory: string;
    amount: number;
}

interface ExpenseFormProps {
    onSubmit: (expense: Omit<Expense, '_id' | 'date'>) => void;
    editExpense: Expense | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, editExpense }) => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [amount, setAmount] = useState(0);

    useEffect(() => {
        if (editExpense) {
            setCategory(editExpense.category);
            setSubcategory(editExpense.subcategory);
            setAmount(editExpense.amount);
        }
    }, [editExpense]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const expense = { category, subcategory, amount };

        onSubmit(expense);

        setCategory('');
        setSubcategory('');
        setAmount(0);
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="mb-4">
                <label className="block text-gray-700">Categoria</label>
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Subcategoria</label>
                <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700">Valor</label>
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full px-3 py-2 border border-gray-300 rounded"
                    required
                />
            </div>
            <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 px-4 rounded"
            >
                {editExpense ? 'Atualizar Despesa' : 'Adicionar Despesa'}
            </button>
        </form>
    );
};

export default ExpenseForm;
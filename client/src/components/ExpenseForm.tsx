import React, { useState, FormEvent, useEffect } from 'react';

interface ExpenseFormProps {
    onSubmit: (expense: { category: string; subcategory: string; amount: number }) => void;
    editExpense: { category: string; subcategory: string; amount: number } | null;
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, editExpense }) => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [amount, setAmount] = useState('');

    useEffect(() => {
        if (editExpense) {
            setCategory(editExpense.category);
            setSubcategory(editExpense.subcategory);
            setAmount(editExpense.amount.toString());
        } else {
            setCategory('');
            setSubcategory('');
            setAmount('');
        }
    }, [editExpense]);

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        if (category && subcategory && amount) {
            onSubmit({ category, subcategory, amount: Number(amount) });
            setCategory('');
            setSubcategory('');
            setAmount('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-6">
            <div className="flex flex-col space-y-4">
                <input
                    type="text"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    placeholder="Categoria"
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    placeholder="Subcategoria"
                    className="p-2 border border-gray-300 rounded"
                />
                <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Valor"
                    className="p-2 border border-gray-300 rounded"
                />
                <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                    {editExpense ? 'Atualizar' : 'Adicionar'}
                </button>
            </div>
        </form>
    );
};

export default ExpenseForm;
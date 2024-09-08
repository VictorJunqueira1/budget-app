import React, { useState, useEffect } from 'react';

interface ExpenseFormProps {
    onSubmit: (expense: { category: string; subcategory: string; amount: number }) => void;
    editExpense?: { category: string; subcategory: string; amount: number };
}

const ExpenseForm: React.FC<ExpenseFormProps> = ({ onSubmit, editExpense }) => {
    const [category, setCategory] = useState('');
    const [subcategory, setSubcategory] = useState('');
    const [amount, setAmount] = useState(0);
    const [categories, setCategories] = useState<string[]>([]);

    useEffect(() => {
        fetch('http://localhost:5000/categories')
            .then((res) => res.json())
            .then((data) => setCategories(data.map((cat: { name: string }) => cat.name)))
            .catch((error) => console.error('Error fetching categories:', error));
    }, []);

    useEffect(() => {
        if (editExpense) {
            setCategory(editExpense.category);
            setSubcategory(editExpense.subcategory);
            setAmount(editExpense.amount);
        }
    }, [editExpense]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({ category, subcategory, amount });
        setCategory('');
        setSubcategory('');
        setAmount(0);
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg max-w-md mx-auto space-y-4">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Adicionar Despesa</h2>
            <div className="flex flex-col">
                <label htmlFor="category" className="text-gray-700 font-semibold mb-2">Categoria</label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    <option value="">Selecione uma categoria</option>
                    {categories.map((cat, index) => (
                        <option key={index} value={cat}>{cat}</option>
                    ))}
                </select>
            </div>

            <div className="flex flex-col">
                <label htmlFor="subcategory" className="text-gray-700 font-semibold mb-2">Subcategoria</label>
                <input
                    id="subcategory"
                    type="text"
                    value={subcategory}
                    onChange={(e) => setSubcategory(e.target.value)}
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <div className="flex flex-col">
                <label htmlFor="amount" className="text-gray-700 font-semibold mb-2">Valor</label>
                <input
                    id="amount"
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    required
                    className="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>

            <button
                type="submit"
                className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
                Salvar
            </button>
        </form>
    );
};

export default ExpenseForm;
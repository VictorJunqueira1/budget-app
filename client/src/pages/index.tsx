import React, { useState } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';

interface Expense {
    category: string;
    subcategory: string;
    amount: number;
}

const Index: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

    const handleAddExpense = (expense: Expense) => {
        if (editingExpense) {
            setExpenses(expenses.map(e =>
                e.category === editingExpense.category && e.subcategory === editingExpense.subcategory && e.amount === editingExpense.amount
                    ? expense
                    : e
            ));
            setEditingExpense(null);
        } else {
            setExpenses([...expenses, expense]);
        }
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);
    };

    const handleDeleteExpense = (index: number) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">Gerenciador de Despesas</h1>
                <ExpenseForm onSubmit={handleAddExpense} editExpense={editingExpense} />
                <ExpenseList
                    expenses={expenses}
                    onEdit={handleEditExpense}
                    onDelete={handleDeleteExpense}
                />
            </div>
        </div>
    );
};

export default Index;
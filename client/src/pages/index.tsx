import React, { useState, useEffect } from 'react';
import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import { NavigationMenuMain } from '@/components/NavigationMenu';

interface Expense {
    _id: string;
    category: string;
    subcategory: string;
    amount: number;
}

const Index: React.FC = () => {
    const [expenses, setExpenses] = useState<Expense[]>([]);
    const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

    useEffect(() => {
        fetch('http://localhost:5000/expenses')
            .then((res) => res.json())
            .then((data) => setExpenses(data))
            .catch((error) => console.error('Error fetching expenses:', error));
    }, []);

    const handleAddExpense = (expense: Omit<Expense, '_id'>) => {
        const expenseToSend = {
            ...expense,
            date: new Date().toISOString()
        };

        if (editingExpense) {
            fetch(`http://localhost:5000/expenses/${editingExpense._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseToSend),
            })
                .then((res) => res.json())
                .then((updatedExpense) => {
                    setExpenses(expenses.map(e =>
                        e._id === editingExpense._id ? updatedExpense : e
                    ));
                    setEditingExpense(null);
                })
                .catch((error) => console.error('Error updating expense:', error));
        } else {
            fetch('http://localhost:5000/expenses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(expenseToSend),
            })
                .then((res) => res.json())
                .then((newExpense) => setExpenses((prevExpenses) => [...prevExpenses, newExpense]))
                .catch((error) => console.error('Error adding expense:', error));
        }
    };

    const handleEditExpense = (expense: Expense) => {
        setEditingExpense(expense);
    };

    const handleDeleteExpense = (id: string) => {
        fetch(`http://localhost:5000/expenses/${id}`, {
            method: 'DELETE',
        })
            .then(() => setExpenses(expenses.filter(e => e._id !== id)))
            .catch((error) => console.error('Error deleting expense:', error));
    };

    const calculateTotal = (expenses: Expense[]) => {
        return expenses.reduce((total, expense) => total + expense.amount, 0);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-lg">
                <NavigationMenuMain />
                <h1 className="text-xl font-semibold mb-6 text-gray-800 text-center">Gerenciador de Despesas</h1>
                <ExpenseForm onSubmit={handleAddExpense} editExpense={editingExpense} />
                <ExpenseList
                    expenses={expenses}
                    onEdit={handleEditExpense}
                    onDelete={handleDeleteExpense}
                />
                <div className="mt-6 p-4 bg-gray-100 rounded-lg text-gray-800 font-semibold text-xl">
                    Total: R${calculateTotal(expenses).toFixed(2)}
                </div>
            </div>
        </div>
    );
};

export default Index;
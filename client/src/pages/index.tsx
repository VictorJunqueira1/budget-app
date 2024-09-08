import ExpenseForm from '@/components/ExpenseForm';
import ExpenseList from '@/components/ExpenseList';
import { useState } from 'react';

const App = () => {
    const [expenses, setExpenses] = useState<{ category: string; amount: number }[]>([]);
    const [editingExpense, setEditingExpense] = useState<{ category: string; amount: number } | null>(null);

    const handleAddExpense = (expense: { category: string; amount: number }) => {
        if (editingExpense) {
            setExpenses(expenses.map(e =>
                e.category === editingExpense.category && e.amount === editingExpense.amount
                    ? expense
                    : e
            ));
            setEditingExpense(null);
        } else {
            setExpenses([...expenses, expense]);
        }
    };

    const handleEditExpense = (expense: { category: string; amount: number }) => {
        setEditingExpense(expense);
    };

    const handleDeleteExpense = (index: number) => {
        setExpenses(expenses.filter((_, i) => i !== index));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-8">
            <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
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

export default App;
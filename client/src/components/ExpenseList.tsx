import React from 'react';

interface Expense {
    category: string;
    subcategory: string;
    amount: number;
}

interface ExpenseListProps {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (index: number) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);

    return (
        <div>
            <ul className="list-disc pl-5">
                {expenses.map((expense, index) => (
                    <li key={index} className="flex justify-between mb-2">
                        <span>{expense.category} - {expense.subcategory}: R$ {expense.amount.toFixed(2)}</span>
                        <div>
                            <button
                                onClick={() => onEdit(expense)}
                                className="bg-blue-500 text-white p-1 rounded mr-2"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(index)}
                                className="bg-red-500 text-white p-1 rounded"
                            >
                                Excluir
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="mt-4 font-bold">Total: R$ {total.toFixed(2)}</div>
        </div>
    );
};

export default ExpenseList;
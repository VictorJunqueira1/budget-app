import React from 'react';

interface Expense {
    _id: string;
    category: string;
    subcategory: string;
    amount: number;
}

interface ExpenseListProps {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (id: string) => void;
}

const ExpenseList: React.FC<ExpenseListProps> = ({ expenses, onEdit, onDelete }) => {
    return (
        <ul className="list-disc pl-5">
            {expenses.map((expense) => (
                <li key={expense._id} className="mb-3">
                    <div className="flex justify-between items-center">
                        <div>
                            <div><strong>Categoria:</strong> {expense.category}</div>
                            <div><strong>Subcategoria:</strong> {expense.subcategory}</div>
                            <div><strong>Valor:</strong> ${expense.amount.toFixed(2)}</div>
                        </div>
                        <div>
                            <button
                                onClick={() => onEdit(expense)}
                                className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                            >
                                Editar
                            </button>
                            <button
                                onClick={() => onDelete(expense._id)}
                                className="bg-red-500 text-white px-3 py-1 rounded"
                            >
                                Deletar
                            </button>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default ExpenseList;
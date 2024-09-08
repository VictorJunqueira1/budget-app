import { useState } from 'react';

type Expense = {
    category: string;
    amount: number;
};

type ExpenseListProps = {
    expenses: Expense[];
    onEdit: (expense: Expense) => void;
    onDelete: (index: number) => void;
};

const ExpenseList = ({ expenses, onEdit, onDelete }: ExpenseListProps) => (
    <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">Lista de Despesas</h2>
        {expenses.length > 0 ? (
            expenses.map((expense, index) => (
                <div key={index} className="flex justify-between items-center p-4 border-b border-gray-200">
                    <div>
                        <span className="text-lg font-medium text-gray-800">{expense.category}</span>
                        <p className="text-gray-500">R$ {expense.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex space-x-2">
                        <button
                            onClick={() => onEdit(expense)}
                            className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-yellow-600 transition duration-200"
                        >
                            Editar
                        </button>
                        <button
                            onClick={() => onDelete(index)}
                            className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition duration-200"
                        >
                            Excluir
                        </button>
                    </div>
                </div>
            ))
        ) : (
            <p className="text-gray-500 text-center">Nenhuma despesa cadastrada.</p>
        )}
    </div>
);

export default ExpenseList;
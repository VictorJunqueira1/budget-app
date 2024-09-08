import { Schema, model, Document } from 'mongoose';

interface Expense extends Document {
    category: string;
    subcategory: string;
    amount: number;
    date: Date;
}

const expenseSchema = new Schema<Expense>({
    category: { type: String, required: true },
    subcategory: { type: String, required: true },
    amount: { type: Number, required: true },
    date: { type: Date, default: Date.now }
});

const ExpenseModel = model<Expense>('Expense', expenseSchema);

export default ExpenseModel;
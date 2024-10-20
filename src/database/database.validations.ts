import { BudgetModel, CreateTransactionArgs, TransactionModel } from "@/interface/database.interface";
import { ModelStatic } from "sequelize";

interface HasBudgetForTransactionArgs {
    price: number;
    budgetId: string;
    budgetModel: ModelStatic<BudgetModel>;
    transactionModel: ModelStatic<TransactionModel>;
}

export const hasBudgetForTransaction = async ({ 
    price, 
    budgetId,
    budgetModel, 
    transactionModel 
}: HasBudgetForTransactionArgs): Promise<boolean> => {
    const _budget = await budgetModel.findOne({ where: { id: budgetId } });
    if (!_budget) {
        return false;
    }
    const { value, margin } = _budget.get();
    if (margin) {
        return true;
    }
    const sum = await transactionModel.sum('price', { where: { budgetId } });
    return (sum + price) <= value;
}


import { BudgetModel, CreateTransactionArgs, TransactionModel } from "@/interface/database.interface";
import { ModelStatic } from "sequelize";
import { NoBudgetForTransactionError } from "@/database/database.errors";

interface HasBudgetForTransactionArgs {
    price: number;
    budgetId: string;
    budgetModel: ModelStatic<BudgetModel>;
    transactionModel: ModelStatic<TransactionModel>;
}

const hasBudgetForTransaction = async ({ 
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
    const transactions = await transactionModel.findAll({ where: { budgetId } });
    const sum = transactions.reduce((acc, v) => acc + v.get().price, 0) + price;
    return sum <= value;
}

export const  throwNoBudgetForTransactionError = async (args: HasBudgetForTransactionArgs) => {
    const hasBudget = await hasBudgetForTransaction(args);
    if (!hasBudget) {
        throw new NoBudgetForTransactionError()
    }
};
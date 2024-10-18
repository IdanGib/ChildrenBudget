import { BudgetModel, CreateTransactionArgs, TransactionModel } from "@/interface/database.interface";
import { ModelCtor, ModelStatic } from "sequelize";

export const hasBudgetForTransaction = async ({ transaction, budgetModel, transactionModel }: { transaction: CreateTransactionArgs, budgetModel: ModelStatic<BudgetModel>, transactionModel: ModelStatic<TransactionModel> }): Promise<boolean> => {
    const { budgetId } = transaction;
    const _budget = await budgetModel.findOne({ where: { id: budgetId } });
    if (!_budget) {
        return false;
    }
    const { value, margin } = _budget.get();
    if (margin) {
        return true;
    }
    const transactions = await transactionModel.findAll({ where: { budgetId } });
    const sum = transactions.reduce((acc, v) => acc + v.get().price, 0) + transaction.price;
    return sum <= value;
}
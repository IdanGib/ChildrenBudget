import { BudgetModel, TransactionModel } from "@/interface/database.interface";
import { ModelStatic } from "sequelize";
import { isBefore } from 'date-fns';
import en from '~/assets/en.json';

const { TransactionValidationErrors } = en.errors;

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
}: HasBudgetForTransactionArgs): Promise<{ err: string | null }> => {
    const _budget = await budgetModel.findOne({ where: { id: budgetId } });
    if (!_budget) {
        return { err: TransactionValidationErrors.BUDGET_NOT_FOUND };
    }
    const { value, margin, expirationDate } = _budget.get();
    if (expirationDate && isBefore(expirationDate, new Date())) {
        return { err: TransactionValidationErrors.BUDGET_EXPIRED };
    }
    if (!margin) {
        const sum = await transactionModel.sum('price', { where: { budgetId } });
        if ((sum + price) > value) {
            return { err: TransactionValidationErrors.NO_BUDGET_VALUE };
        }
    }

    return { err: null };
}


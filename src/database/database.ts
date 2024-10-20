import { CreateBudgetArgs, CreateBudgetResult, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult, DatabaseActions, DatabaseConfig, DeleteBudgetArgs, DeleteBudgetResult, DeleteChildArgs, DeleteChildResult, DeleteParentArgs, DeleteParentResult, DeleteTransactionArgs, DeleteTransactionResult, ReadBudgetsArgs, ReadBudgetsResult, ReadChildrenArgs, ReadChildrenResult, ReadOrder, ReadParentsArgs, ReadParentsResult, ReadTransactions, ReadTransactionsArgs, ReadTransactionsResult, UpdateBudgetArgs, UpdateBudgetResult, UpdateChildArgs, UpdateChildResult, UpdateParentArgs, UpdateParentResult, UpdateTransactionArgs, UpdateTransactionResult } from "@/interface/database.interface";
import { Sequelize } from "sequelize";
import { createBudgetModel } from "@/database/models/budgets.model";
import { createTransactionModel } from "@/database/models/transactions.model";
import { createParentModel } from "@/database/models/parents.model";
import { createChildModel } from "@/database/models/children.model";
import { throwNoBudgetForTransactionError } from "./database.validations";
import { DEFAULT_ORDER_DIRECTION } from "./database.constants";

const getOrder = <T = unknown>({ order, direction }: Partial<ReadOrder<T>>) => {
    return order ? [order, direction ?? DEFAULT_ORDER_DIRECTION] : undefined;
}

const authenicate = async (sequelize: Sequelize): Promise<boolean> => {
    try {
        await sequelize.authenticate();
        return true;
    } catch (e) {
        return false;
    }
}

const createModels = async (sequelize: Sequelize) => {
    const budget = createBudgetModel(sequelize);
    const transaction = createTransactionModel(sequelize);
    const parent = createParentModel(sequelize);
    const child = createChildModel(sequelize);

    parent.hasMany(child, { foreignKey: 'parentId', onDelete: 'CASCADE' });
    child.belongsTo(parent);
    child.hasMany(budget, { foreignKey: 'childId', onDelete: 'CASCADE'  });
    budget.belongsTo(child);
    budget.hasMany(transaction, { foreignKey: 'budgetId', onDelete: 'CASCADE'  });
    transaction.belongsTo(budget);

    await sequelize.sync({ alter: true });
    return { budget, parent, child, transaction };
}

export const database = async ({ postgresql }: DatabaseConfig): Promise<DatabaseActions | null> => {
    const sequelize = new Sequelize({
        ...postgresql,
        dialect: 'postgres',
        logging: false,
    });
    
    const close = async () => {
        await sequelize.close();
    }

    const connected = await authenicate(sequelize);
    if (!connected) {
        await close();
        return null;
    }
    
    const { child, parent, transaction, budget } = await createModels(sequelize);

    const createBudget = async (args: CreateBudgetArgs): Promise<CreateBudgetResult> => {
        const result = await budget.create({ ...args });
        return result.get();
    }

    const createChild = async (args: CreateChildArgs): Promise<CreateChildResult> => {
        const result = await child.create({ ...args });
        return result.get();
    }

    const createParent = async (args: CreateParentArgs): Promise<CreateParentResult> => {
        const result = await parent.create({ ...args });
        return result.get();
    }

    const createTransaction = async (args: CreateTransactionArgs): Promise<CreateTransactionResult> => {
        const { price, budgetId } = args;
        await throwNoBudgetForTransactionError({ price, budgetId , transactionModel: transaction, budgetModel: budget });
        const result = await transaction.create({ ...args });
        return  result.get();
    }


    const updateBudget = async ({ where, data }: UpdateBudgetArgs): Promise<UpdateBudgetResult> => {
        const [, [result]] = await budget.update(data, { where, returning: true });
        return result.get();
    }

    const updateChild = async ({ where, data }: UpdateChildArgs): Promise<UpdateChildResult> => {
        const [, [result]] = await child.update(data, { where, returning: true });
        return result.get();
    }

    const updateParent = async ({ where, data }: UpdateParentArgs): Promise<UpdateParentResult> => {
        const [, [result]] = await parent.update(data, { where, returning: true });
        return result.get();
    }

    const updateTransaction = async ({ where, data }: UpdateTransactionArgs): Promise<UpdateTransactionResult> => {
        const { price } = data;
        if (price) {
            const _ = (await transaction.findOne({ where }))?.get();
            await throwNoBudgetForTransactionError({ 
                price, 
                budgetId: _?.budgetId ?? '', 
                transactionModel: transaction, 
                budgetModel: budget 
            });
        }
        const [, [result]] = await transaction.update(data, { where, returning: true });
        return result.get();
    }

    const deleteBudget = async ({ where }: DeleteBudgetArgs): Promise<DeleteBudgetResult> => {
        const result = await budget.destroy({ where, cascade: true  });
        return result;
    }

    const deleteChild = async ({ where }: DeleteChildArgs): Promise<DeleteChildResult> => {
        const result = await child.destroy({ where, cascade: true  });
        return result;
    }

    const deleteParent = async ({ where }: DeleteParentArgs): Promise<DeleteParentResult> => {
        const result = await parent.destroy({ where, cascade: true });
        return result;
    }

    const deleteTransaction = async ({ where }: DeleteTransactionArgs): Promise<DeleteTransactionResult> => {
        const result = await transaction.destroy({ where });
        return result;
    }

    const readParents = async ({ order, direction, ...args }: ReadParentsArgs): Promise<ReadParentsResult> => {
        const result = await parent.findAll({ ...args, order: getOrder({ order, direction }) });
        return result.map(r => r.get());
    }
    
    const readChildren = async ({ order, direction, ...args }: ReadChildrenArgs): Promise<ReadChildrenResult> => {
        const result = await child.findAll({ ...args, order: getOrder({ order, direction }) });
        return result.map(r => r.get());
    }
    
    const readBudgets = async ({ order, direction, ...args }: ReadBudgetsArgs): Promise<ReadBudgetsResult> => {
        const result = await budget.findAll({ ...args, order: getOrder({ order, direction }) });
        return result.map(r => r.get());
    }
    
    const readTransactions = async ({ order, direction, ...args }: ReadTransactionsArgs): Promise<ReadTransactionsResult> => {
        const result = await transaction.findAll({ ...args, order: getOrder({ order, direction }) });
        return result.map(r => r.get());
    }

    return {
        createBudget,
        createChild,
        createParent,
        createTransaction,
        updateBudget,
        updateChild,
        updateParent,
        updateTransaction,
        deleteBudget,
        deleteChild,
        deleteParent,
        deleteTransaction,
        readBudgets,
        readChildren,
        readParents,
        readTransactions,
        close,
    };
}
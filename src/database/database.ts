import { CreateBudgetArgs, CreateBudgetResult, CreateChild, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult, DatabaseActions, DatabaseConfig } from "@/interface/database.interface";
import { Model, Sequelize } from "sequelize";
import { BudgetModel } from "./models/budgets.model";
import { TransactionModel } from "./models/transactions.model";
import { ParentModel } from "./models/parents.model";
import { ChildModel } from "./models/children.model";
import { logger } from "@/lib/logger";
import { Budget, Child, Parent } from "@/interface/models.interface";

const authenicate = async (sequelize: Sequelize): Promise<boolean> => {
    try {
        await sequelize.authenticate();
        return true;
    } catch (e) {
        return false;
    }
}

const createModels = async (sequelize: Sequelize) => {
    const budget = BudgetModel(sequelize);
    const transaction = TransactionModel(sequelize);
    const parent = ParentModel(sequelize);
    const child = ChildModel(sequelize);
    parent.hasMany(child, { foreignKey: 'parentId', onDelete: 'CASCADE' });
    child.belongsTo(parent);
    child.hasMany(budget, { foreignKey: 'childId', onDelete: 'CASCADE'  });
    budget.belongsTo(child);
    budget.hasMany(transaction, { foreignKey: 'budgetId', onDelete: 'CASCADE'  });
    transaction.belongsTo(budget);
    await sequelize.sync();
    return { budget, parent, child, transaction };
}

export const database = async ({ postgresql }: DatabaseConfig): Promise<DatabaseActions & { close: () => Promise<void> } | null> => {
    const sequelize = new Sequelize({
        ...postgresql,
        dialect: 'postgres',
        logging: false,
    });
    const connected = await authenicate(sequelize);
    
    if (!connected) {
        return null;
    }
    
    const { child, parent, transaction, budget } = await createModels(sequelize);

    const createBudget = async (args: CreateBudgetArgs): Promise<CreateBudgetResult> => {
        const result = await budget.create<Model<CreateBudgetArgs>>({ ...args });
        return {
            success: true,
            message: '',
            result
        };
    }

    const createChild = async (args: CreateChildArgs): Promise<CreateChildResult> => {
        const result = await child.create<Model<CreateChildArgs>>({ ...args });
        return {
            success: true,
            message: '',
            result
        };
    }

    const createParent = async (args: CreateParentArgs): Promise<CreateParentResult> => {
        const result = await parent.create<Model<CreateParentArgs>>({ ...args });
        return {
            success: true,
            message: '',
            result
        };
    }

    const createTransaction = async (args: CreateTransactionArgs): Promise<CreateTransactionResult> => {
        const result = await transaction.create<Model<CreateTransactionArgs>>({ ...args });
        return {
            success: true,
            message: '',
            result
        };
    }
    const close = async () => {
        await sequelize.close();
    }
    return {
        createBudget,
        createChild,
        createParent,
        createTransaction,
        close,
    };
}
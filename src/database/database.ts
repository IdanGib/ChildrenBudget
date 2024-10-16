import { CreateBudgetArgs, CreateBudgetResult, CreateChild, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult, DatabaseActions, DatabaseConfig } from "@/interface/database.interface";
import { Sequelize } from "sequelize";
import { BudgetModel } from "./models/budgets.model";
import { TransactionModel } from "./models/transactions.model";
import { ParentModel } from "./models/parents.model";
import { ChildModel } from "./models/children.model";
import { logger } from "@/lib/logger";

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
    
    await createModels(sequelize);

    const createBudget = async (args: CreateBudgetArgs): Promise<CreateBudgetResult> => {
        return {
            success: true,
            message: '',
            result: {}
        };
    }

    const createChild = async (args: CreateChildArgs): Promise<CreateChildResult> => {
        return {
            success: true,
            message: '',
            result: {}
        };
    }

    const createParent = async (args: CreateParentArgs): Promise<CreateParentResult> => {
        return {
            success: true,
            message: '',
            result: {}
        };
    }

    const createTransaction = async (args: CreateTransactionArgs): Promise<CreateTransactionResult> => {
        return {
            success: true,
            message: '',
            result: {}
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
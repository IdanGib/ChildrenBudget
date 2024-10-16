import { CreateBudgetArgs, CreateBudgetResult, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult, DatabaseActions, DatabaseConfig } from "@/interface/database.interface";
import { Model, Sequelize } from "sequelize";
import { BudgetModel } from "@/database/models/budgets.model";
import { TransactionModel } from "@/database/models/transactions.model";
import { ParentModel } from "@/database/models/parents.model";
import { ChildModel } from "@/database/models/children.model";
import { Budget, Child, Parent, Transaction } from "@/interface/models.interface";

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

export const database = async ({ postgresql }: DatabaseConfig): Promise<DatabaseActions | null> => {
    const sequelize = new Sequelize({
        ...postgresql,
        dialect: 'postgres',
        logging: false,
    });
    const connected = await authenicate(sequelize);
        
    const close = async () => {
        await sequelize.close();
    }

    if (!connected) {
        await close();
        return null;
    }
    
    const { child, parent, transaction, budget } = await createModels(sequelize);

    const createBudget = async (args: CreateBudgetArgs): Promise<CreateBudgetResult> => {
        const result = await budget.create<Model<Budget, CreateBudgetArgs>>({ ...args });
        return result.get();
    }

    const createChild = async (args: CreateChildArgs): Promise<CreateChildResult> => {
        const result = await child.create<Model<Child, CreateChildArgs>>({ ...args });
        return result.get();
    }

    const createParent = async (args: CreateParentArgs): Promise<CreateParentResult> => {
        const result = await parent.create<Model<Parent, CreateParentArgs>>({ ...args });
        return result.get();
    }

    const createTransaction = async (args: CreateTransactionArgs): Promise<CreateTransactionResult> => {
        const result = await transaction.create<Model<Transaction, CreateTransactionArgs>>({ ...args });
        return  result.get();
    }

    return {
        createBudget,
        createChild,
        createParent,
        createTransaction,
        close,
    };
}
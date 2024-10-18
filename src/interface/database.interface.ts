import { Budget, Child, Parent, Transaction } from "@/interface/models.interface";
import { Model } from "sequelize";

export type CreateParent = (args: Omit<Parent, 'id'>) => Promise<Parent>;
export type CreateChild = (args: Omit<Child, 'id'>) => Promise<Child>;
export type CreateBudget = (args: Omit<Budget, 'id'>) => Promise<Budget>;
export type CreateTransaction = (args: Omit<Transaction, 'id'>) => Promise<Transaction>;

export type UpdateParent = (args: { where: { id: string; }, data: Partial<Omit<Parent, 'id'>> }) => Promise<Parent>;
export type UpdateChild = (args: { where: { id: string;}, data: Partial<Omit<Child, 'id'>> }) => Promise<Child>;
export type UpdateBudget = (args: { where: {id: string; }, data: Partial<Omit<Budget, 'id'>> }) => Promise<Budget>;
export type UpdateTransaction = (args: { where: { id: string; }, data: Partial<Omit<Transaction, 'id'>> }) => Promise<Transaction>;

export type DeleteParent = (args: { where: { id: string; } }) => Promise<number>;
export type DeleteChild = (args: { where: { id: string; } }) => Promise<number>;
export type DeleteBudget = (args: { where: { id: string; } }) => Promise<number>;
export type DeleteTransaction = (args: { where: { id: string; } }) => Promise<number>;

export interface PostgreSqlConfig {
    port: number;
    host: string;
    username: string;
    password: string;
    database: string;
}

export interface DatabaseConfig {
    postgresql?: PostgreSqlConfig;
}

export interface DatabaseActions {
    createParent: CreateParent;
    createChild: CreateChild;
    createBudget: CreateBudget;
    createTransaction: CreateTransaction;

    updateParent: UpdateParent;
    updateChild: UpdateChild;
    updateBudget: UpdateBudget;
    updateTransaction: UpdateTransaction;

    deleteParent: DeleteParent;
    deleteBudget: DeleteBudget;
    deleteChild: DeleteChild;
    deleteTransaction: DeleteTransaction;
    
    close: () => Promise<void>;
}

export type CreateParentArgs = Parameters<CreateParent>[0];
export type CreateParentResult = Awaited<ReturnType<CreateParent>>;

export type CreateChildArgs = Parameters<CreateChild>[0];
export type CreateChildResult = Awaited<ReturnType<CreateChild>>;

export type CreateBudgetArgs = Parameters<CreateBudget>[0];
export type CreateBudgetResult = Awaited<ReturnType<CreateBudget>>;

export type CreateTransactionArgs = Parameters<CreateTransaction>[0];
export type CreateTransactionResult = Awaited<ReturnType<CreateTransaction>>;


export type UpdateParentArgs = Parameters<UpdateParent>[0];
export type UpdateParentResult = Awaited<ReturnType<UpdateParent>>;

export type UpdateChildArgs = Parameters<UpdateChild>[0];
export type UpdateChildResult = Awaited<ReturnType<UpdateChild>>;

export type UpdateBudgetArgs = Parameters<UpdateBudget>[0];
export type UpdateBudgetResult = Awaited<ReturnType<UpdateBudget>>;

export type UpdateTransactionArgs = Parameters<UpdateTransaction>[0];
export type UpdateTransactionResult = Awaited<ReturnType<UpdateTransaction>>;


export type DeleteParentArgs = Parameters<DeleteParent>[0];
export type DeleteParentResult = Awaited<ReturnType<DeleteParent>>;

export type DeleteChildArgs = Parameters<DeleteChild>[0];
export type DeleteChildResult = Awaited<ReturnType<DeleteChild>>;

export type DeleteBudgetArgs = Parameters<DeleteBudget>[0];
export type DeleteBudgetResult = Awaited<ReturnType<DeleteBudget>>;

export type DeleteTransactionArgs = Parameters<DeleteTransaction>[0];
export type DeleteTransactionResult = Awaited<ReturnType<DeleteTransaction>>;

export type BudgetModel = Model<Budget, CreateBudgetArgs>;
export type ChildModel = Model<Child, CreateChildArgs>;
export type ParentModel = Model<Parent, CreateParentArgs>;
export type TransactionModel = Model<Transaction, CreateTransactionArgs>;
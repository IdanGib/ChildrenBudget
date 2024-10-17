import { Budget, Child, Parent, Transaction } from "@/interface/models.interface";

export type CreateParent = (args: Omit<Parent, 'id'>) => Promise<Parent>;
export type CreateChild = (args: Omit<Child, 'id'>) => Promise<Child>;
export type CreateBudget = (args: Omit<Budget, 'id'>) => Promise<Budget>;
export type CreateTransaction = (args: Omit<Transaction, 'id'>) => Promise<Transaction>;

export type UpdateParent = (args: { where: { id: string; }, data: Partial<Omit<Parent, 'id'>> }) => Promise<Parent>;
export type UpdateChild = (args: { where: { id: string;}, data: Partial<Omit<Child, 'id'>> }) => Promise<Child>;
export type UpdateBudget = (args: { where: {id: string; }, data: Partial<Omit<Budget, 'id'>> }) => Promise<Budget>;
export type UpdateTransaction = (args: { where: { id: string; }, data: Partial<Omit<Transaction, 'id'>> }) => Promise<Transaction>;

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

// update

export type UpdateParentArgs = Parameters<UpdateParent>[0];
export type UpdateParentResult = Awaited<ReturnType<UpdateParent>>;

export type UpdateChildArgs = Parameters<UpdateChild>[0];
export type UpdateChildResult = Awaited<ReturnType<UpdateChild>>;

export type UpdateBudgetArgs = Parameters<UpdateBudget>[0];
export type UpdateBudgetResult = Awaited<ReturnType<UpdateBudget>>;

export type UpdateTransactionArgs = Parameters<UpdateTransaction>[0];
export type UpdateTransactionResult = Awaited<ReturnType<UpdateTransaction>>;
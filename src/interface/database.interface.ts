import { Budget, Child, Parent, Transaction } from "./models.interface";

interface CommonResult<T> {
    success: true; 
    message: string;
    result: T;
};

export type InitDbClient<T, R> = (config: T) => Promise<R>
export type CreateParent = (args: Omit<Parent, 'id'>) => Promise<CommonResult<Parent>>;
export type CreateChild = (args: Omit<Child, 'id'>) => Promise<CommonResult<Child>>;
export type CreateBudget = (args: Omit<Budget, 'id'>) => Promise<CommonResult<Budget>>;
export type CreateTransaction = (args: Omit<Transaction, 'id'>) => Promise<CommonResult<Transaction>>;

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
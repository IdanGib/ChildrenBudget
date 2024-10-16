import { Budget, Child, Parent, Transaction } from "./models.interface";

interface CommonResult<T> {
    success: true; 
    message: string;
    result: T;
};

export type InitDbClient<T, R> = (config: T) => Promise<R>
export type CreateParent<T = {}> = (args: Omit<Parent, 'id'>) => Promise<CommonResult<T>>;
export type CreateChild<T = {}> = (args: Omit<Child, 'id'>) => Promise<CommonResult<T>>;
export type CreateBudget<T = {}> = (args: Omit<Budget, 'id'>) => Promise<CommonResult<T>>;
export type CreateTransaction<T = {}> = (args: Omit<Transaction, 'id'>) => Promise<CommonResult<T>>;

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
}

export type CreateParentArgs = Parameters<CreateParent>[0];
export type CreateParentResult = Awaited<ReturnType<CreateParent>>;

export type CreateChildArgs = Parameters<CreateChild>[0];
export type CreateChildResult = Awaited<ReturnType<CreateChild>>;

export type CreateBudgetArgs = Parameters<CreateBudget>[0];
export type CreateBudgetResult = Awaited<ReturnType<CreateBudget>>;

export type CreateTransactionArgs = Parameters<CreateTransaction>[0];
export type CreateTransactionResult = Awaited<ReturnType<CreateTransaction>>;
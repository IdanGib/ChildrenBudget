import { Sequelize } from "sequelize";
import { Budget, Child, Parent, Transaction } from "./models.interface";
import { PostgreSqlConfig } from "./postgresql-client.interface";

type CommonOmited = 'id' | 'createdAt' | 'updatedAt';

interface CommonResult<T> {
    success: true; 
    message: string;
    result: T;
};

export type InitDbClient<T, R> = (config: T) => Promise<R>
export type CreateParent<T = {}> = (args: Omit<Parent, CommonOmited>) => Promise<CommonResult<T>>;
export type CreateChild<T = {}> = (args: Omit<Child, CommonOmited>) => Promise<CommonResult<T>>;
export type CreateBudget<T = {}> = (args: Omit<Budget, CommonOmited>) => Promise<CommonResult<T>>;
export type CreateTransaction<T = {}> = (args: Omit<Transaction, CommonOmited>) => Promise<CommonResult<T>>;

export interface DatabaseConfig {
    postgresql?: PostgreSqlConfig;
}

export type DatabaseClientInitResult =  Sequelize | undefined;

export interface DatabaseClient<T, R = DatabaseClientInitResult> {
    init: InitDbClient<T, R>;
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
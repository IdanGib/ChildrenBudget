import { Budget, Child, Parent, Transaction } from "./models.interface";

export interface MySqlConfig {

}

export type DatabaseClientInitConfig = Partial<{
    mysql: MySqlConfig;
}>;


// database client interface
type CommonOmited = 'id' | 'createdAt' | 'updatedAt';

interface CommonResult<T> {
    success: true; 
    message: string;
    result: T;
};

export type InitDbClient = (config: DatabaseClientInitConfig) => Promise<void>
export type CreateParent<T = {}> = (args: Omit<Parent, CommonOmited>) => Promise<CommonResult<T>>;
export type CreateChild<T = {}> = (args: Omit<Child, CommonOmited>) => Promise<CommonResult<T>>;
export type CreateBudget<T = {}> = (args: Omit<Budget, CommonOmited>) => Promise<CommonResult<T>>;
export type CreateTransaction<T = {}> = (args: Omit<Transaction, CommonOmited>) => Promise<CommonResult<T>>;

export interface DatabaseClient {
    init: InitDbClient;
    createParent: CreateParent;
    createChild: CreateChild;
    createBudget: CreateBudget;
    createTransaction: CreateTransaction;
}

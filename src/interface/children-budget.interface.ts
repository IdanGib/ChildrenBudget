import { CreateBudget, CreateChild, CreateParent, CreateTransaction, InitDbClient } from "./database.interface";

export type InitDbClientArgs = Parameters<InitDbClient>[0];
export type InitDbClientResult = Awaited<ReturnType<InitDbClient>>;

export type CreateParentArgs = Parameters<CreateParent>[0];
export type CreateParentResult = Awaited<ReturnType<CreateParent>>;

export type CreateChildArgs = Parameters<CreateChild>[0];
export type CreateChildResult = Awaited<ReturnType<CreateChild>>;

export type CreateBudgetArgs = Parameters<CreateBudget>[0];
export type CreateBudgetResult = Awaited<ReturnType<CreateBudget>>;

export type CreateTransactionArgs = Parameters<CreateTransaction>[0];
export type CreateTransactionResult = Awaited<ReturnType<CreateTransaction>>;
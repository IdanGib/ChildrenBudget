import { Budget, Child, Parent, Transaction } from "@/interface/models.interface";
import { Model } from "sequelize";

type ParentArg = Omit<Parent, 'id'>;
type ChildArg = Omit<Child, 'id'>;
type BudgetArg = Omit<Budget, 'id'>;
type TransactionArg = Omit<Transaction, 'id'>;
type OrderDirection = 'asc' | 'desc';
export type ReadOrder<T> = { order: keyof T, direction: OrderDirection };
type ReadOptions<T> = Partial<{ offset: number; limit: number; } & ReadOrder<T>>;

export type CreateParent = (args: ParentArg) => Promise<Parent>;
export type CreateChild = (args: ChildArg) => Promise<Child>;
export type CreateBudget = (args: BudgetArg) => Promise<Budget>;
export type CreateTransaction = (args: TransactionArg) => Promise<Transaction>;

type UpdateParent = (args: { where: { id: string; }, data: Partial<ParentArg> }) => Promise<Parent>;
type UpdateChild = (args: { where: { id: string;}, data: Partial<ChildArg> }) => Promise<Child>;
type UpdateBudget = (args: { where: {id: string; }, data: Partial<BudgetArg> }) => Promise<Budget>;
type UpdateTransaction = (args: { where: { id: string; }, data: Partial<TransactionArg> }) => Promise<Transaction>;

type DeleteParent = (args: { where: { id: string; } }) => Promise<number>;
type DeleteChild = (args: { where: { id: string; } }) => Promise<number>;
type DeleteBudget = (args: { where: { id: string; } }) => Promise<number>;
type DeleteTransaction = (args: { where: { id: string; } }) => Promise<number>;

type ReadParents = (args: { where: Partial<{ id: string; }> } & ReadOptions<Parent>) => Promise<Array<Parent>>;
type ReadChildren = (args: { where: Partial<{ id: string; parnetId: string; }> } & ReadOptions<Child> ) => Promise<Array<Child>>;
type ReadBudgets = (args: { where: Partial<{ id: string; childId: string; }> } & ReadOptions<Budget>) => Promise<Array<Budget>>;
type ReadTransactions = (args: { where: Partial<{ id: string; budgetId: string; }> } & ReadOptions<Transaction>) => Promise<Array<Transaction>>;

type GetBudgetInfo = (args: { id: string; }) => Promise<{ 
    spent: number; 
    child: Child, 
    budget: Budget,
}>;

type GetChildInfo = (args: { id: string; }) => Promise<{
    child: Child;
    age: number;
    budgets: Array<{ value: number; spent: number }>;
}>;

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

    readParents: ReadParents;
    readBudgets: ReadBudgets;
    readChildren: ReadChildren;
    readTransactions: ReadTransactions;
    
    getBudgetInfo: GetBudgetInfo;
    getChildInfo: GetChildInfo;

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


export type ReadParentsArgs = Parameters<ReadParents>[0];
export type ReadParentsResult = Awaited<ReturnType<ReadParents>>;

export type ReadChildrenArgs = Parameters<ReadChildren>[0];
export type ReadChildrenResult = Awaited<ReturnType<ReadChildren>>;

export type ReadBudgetsArgs = Parameters<ReadBudgets>[0];
export type ReadBudgetsResult = Awaited<ReturnType<ReadBudgets>>;

export type ReadTransactionsArgs = Parameters<ReadTransactions>[0];
export type ReadTransactionsResult = Awaited<ReturnType<ReadTransactions>>;

export type GetBudgetInfoArgs = Parameters<GetBudgetInfo>[0];
export type GetBudgetInfoResult = Awaited<ReturnType<GetBudgetInfo>>;

export type GetChildInfoArgs = Parameters<GetChildInfo>[0];
export type GetChildInfoResult = Awaited<ReturnType<GetChildInfo>>;

export type BudgetModel = Model<Budget, CreateBudgetArgs>;
export type ChildModel = Model<Child, CreateChildArgs>;
export type ParentModel = Model<Parent, CreateParentArgs>;
export type TransactionModel = Model<Transaction, CreateTransactionArgs>;
import { PostgreSqlConfig } from "./postgresql-client.interface";

export type Login = (args: {}) => Promise<void>;
export type Init = (args: {}) => Promise<void>;

export interface ChildrenBudget {
    init: Init;
}

export interface ChildrenBudgetConfig {
    postgreSql: PostgreSqlConfig;
}
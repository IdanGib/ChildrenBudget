import { PostgreSqlConfig } from "./database.interface";

export interface ChildrenBudget {
    close: () => Promise<void>;
}

export interface ChildrenBudgetConfig {
    postgresql?: PostgreSqlConfig;
}
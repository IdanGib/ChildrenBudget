import { PostgreSqlConfig } from "@/interface/database.interface";

export interface ChildrenBudget {
    close: () => Promise<void>;
}

export interface ChildrenBudgetConfig {
    postgresql?: PostgreSqlConfig;
}
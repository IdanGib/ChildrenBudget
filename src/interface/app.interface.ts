import { DatabaseActions, PostgreSqlConfig } from "@/interface/database.interface";

export interface ChildrenBudget extends Omit<DatabaseActions, 'close'> {
    shutdown: () => Promise<void>;
}

export interface ChildrenBudgetConfig {
    postgresql?: PostgreSqlConfig;
}
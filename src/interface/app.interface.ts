import { DatabaseActions, PostgreSqlConfig } from "@/interface/database.interface";
import { CurrencyData } from "@/lib/currency";

export interface ChildrenBudget extends Omit<DatabaseActions, 'close'> {
    listCurrencies: () => CurrencyData[];
    shutdown: () => Promise<void>;
}

export interface ChildrenBudgetConfig {
    postgresql?: PostgreSqlConfig;
}
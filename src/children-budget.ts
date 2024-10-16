import { database } from "./database/database.index";
import { ChildrenBudget, ChildrenBudgetConfig, Init, Login } from "./interface/children-budget.interface";
import { DatabaseClient } from "./interface/database.interface";
import { PostgreSqlConfig } from "./interface/postgresql-client.interface";

export class ChildrenBudgetImplementation implements ChildrenBudget {
    private db: DatabaseClient<PostgreSqlConfig> | undefined;
    
    constructor(private config: ChildrenBudgetConfig) {}
    
    public async init() {
        this.db = await database.initPostgresql({ postgresql: this.config.postgreSql });
    }
}
import { PostgreSqlClient } from "./database/postgresql.client";
import { ChildrenBudget, ChildrenBudgetConfig, Init, Login } from "./interface/children-budget.interface";
import { config } from "./lib/config";

export class ChildrenBudgetImplementation implements ChildrenBudget {
    private dbClient: PostgreSqlClient | undefined;
    constructor(private config: ChildrenBudgetConfig) {}
    public async init() {
        const dbClient = new PostgreSqlClient();
        await dbClient.init(this.config.postgreSql);
        this.dbClient = dbClient;
    }
}
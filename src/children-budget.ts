import { MySqlClient } from "./database/mysql.client";
import { ChildrenBudget, Init, Login } from "./interface/children-budget.interface";
import { config } from "./lib/config";

export class ChildrenBudgetImplementation implements ChildrenBudget {
    private dbClient: MySqlClient | undefined;
    public async login() {
        await this.dbClient?.createParent({ name: '', imageUrl: '' });
    }
    public async init() {
        const dbClient = new MySqlClient();
        await dbClient.init(config.myslqConfig);
        this.dbClient = dbClient;
    }
}
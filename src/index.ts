import { DbClientsMap } from "./database/database.index";
import { ChildrenBudgetArgs } from "./interface/children-budget.interface";
import { DbClientsOptions } from "./interface/database.interface";

export const ChildrenBudget = async ({ dbClientOption = DbClientsOptions.MY_SQL }: ChildrenBudgetArgs) => {
    const dbClient = DbClientsMap[dbClientOption];
    await dbClient.init({
        username: '',
        password: '',
        host: '',
        port: 1,
    });
    return dbClient;
};
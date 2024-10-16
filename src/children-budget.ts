import { database } from "./database/database";
import { ChildrenBudget, ChildrenBudgetConfig } from "./interface/children-budget.interface";

export const createChildrenBudgetApplication = async ({ postgresql }: ChildrenBudgetConfig): Promise<ChildrenBudget | null> => {
    const actions = await database({ postgresql });
    if (!actions) {
        return null;
    }
    return {

    };
}
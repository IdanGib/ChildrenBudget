import { database } from "@/database/database";
import { ChildrenBudget, ChildrenBudgetConfig } from "@/interface/children-budget.interface";

export const childrenBudgetApplication = async ({ postgresql }: ChildrenBudgetConfig): Promise<ChildrenBudget | null> => {
    const actions = await database({ postgresql });
    if (!actions) {
        return null;
    }
    return {
        async close() {
            await actions.close();
        }
    };
}

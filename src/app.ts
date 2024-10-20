import { database } from "@/database/database";
import { ChildrenBudget, ChildrenBudgetConfig } from "@/interface/app.interface";

export const childrenBudgetApplication = async ({ postgresql }: ChildrenBudgetConfig): Promise<ChildrenBudget | null> => {
    const actions = await database({ postgresql });
    if (!actions) {
        return null;
    }
    return {
        ...actions,
        async shutdown() {
            await actions.close();
        },
    };
}

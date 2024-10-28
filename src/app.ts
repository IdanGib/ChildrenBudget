import { database } from "@/database/database";
import { ChildrenBudget, ChildrenBudgetConfig } from "@/interface/app.interface";
import { Currency } from "./lib/currency";

export const childrenBudgetApplication = async ({ postgresql }: ChildrenBudgetConfig): Promise<ChildrenBudget | null> => {
    const actions = await database({ postgresql });
    if (!actions) {
        return null;
    }
    return {
        ...actions,
        listCurrencies: Currency.listCurrencies,
        async shutdown() {
            await actions.close();
        },
    };
}

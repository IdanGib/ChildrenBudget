import { ChildrenBudgetImplementation } from "./children-budget"
import { ChildrenBudget, ChildrenBudgetConfig } from "./interface/children-budget.interface";

export const childrenBudget = async (config: ChildrenBudgetConfig): Promise<ChildrenBudget> => {
    const childrenBudget = new ChildrenBudgetImplementation(config);
    await childrenBudget.init();
    return childrenBudget;
}

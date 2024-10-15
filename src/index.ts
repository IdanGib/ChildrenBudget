import { ChildrenBudgetImplementation } from "./children-budget"
import { ChildrenBudget } from "./interface/children-budget.interface";

export const childrenBudget = async (): Promise<ChildrenBudget> => {
    const childrenBudget = new ChildrenBudgetImplementation();
    await childrenBudget.init();
    return childrenBudget;
}

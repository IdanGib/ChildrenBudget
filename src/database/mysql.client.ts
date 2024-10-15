import { CreateBudgetArgs, CreateBudgetResult, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult, InitDbClientArgs } from "@/interface/children-budget.interface";
import { DatabaseClient } from "@/interface/database.interface";

export class MySqlClient implements DatabaseClient {

    public async init(args: InitDbClientArgs) {
        
    }

    public async createParent(args: CreateParentArgs): Promise<CreateParentResult> {
        return {
            success: true,
            message: '',
            result: {},
        };
    }

    public async createChild(args: CreateChildArgs): Promise<CreateChildResult> {
        return {
            success: true,
            message: '',
            result: {},
        };
    }

    public async createBudget(args: CreateBudgetArgs): Promise<CreateBudgetResult> {
        return {
            success: true,
            message: '',
            result: {},
        };
    }

    public async createTransaction(args: CreateTransactionArgs): Promise<CreateTransactionResult> {
        return {
            success: true,
            message: '',
            result: {},
        };
    }
}
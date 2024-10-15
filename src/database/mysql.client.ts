import { CreateBudgetArgs, CreateBudgetResult, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult } from "@/interface/database.interface";
import { DatabaseClient } from "@/interface/database.interface";
import { MySqlConfig } from "@/interface/mysql-client.interface";

export class MySqlClient implements DatabaseClient<MySqlConfig> {

    public async init(args: MySqlConfig) {
        
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
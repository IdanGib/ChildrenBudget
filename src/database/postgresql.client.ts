import { CreateBudgetArgs, CreateBudgetResult, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult, DatabaseClientInitResult } from "@/interface/database.interface";
import { DatabaseClient } from "@/interface/database.interface";
import { PostgreSqlConfig } from "@/interface/postgresql-client.interface";
import { Sequelize } from "sequelize";

export class PostgreSqlClient implements DatabaseClient<PostgreSqlConfig> {
    public async init({ username, password, host, database, port }: PostgreSqlConfig): Promise<DatabaseClientInitResult> {
        const sequelize: Sequelize = new Sequelize(database, username, password, {
            host,
            port,
            dialect: 'postgres',
        });
        try {
            await sequelize.authenticate();
            return sequelize;
        } catch (e) {
            return undefined;
        }
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
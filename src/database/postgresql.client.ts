import { CreateBudgetArgs, CreateBudgetResult, CreateChildArgs, CreateChildResult, CreateParentArgs, CreateParentResult, CreateTransactionArgs, CreateTransactionResult } from "@/interface/database.interface";
import { DatabaseClient } from "@/interface/database.interface";
import { PostgreSqlConfig } from "@/interface/postgresql-client.interface";
import { logger } from "@/lib/logger";
import { Sequelize } from 'sequelize';

export class PostgreSqlClient implements DatabaseClient<PostgreSqlConfig> {
    private sequelize: Sequelize | undefined;
    public async init({ username, password, host, database, port }: PostgreSqlConfig) {
        const sequelize = new Sequelize(database, username, password, {
            host,
            dialect: 'postgres'
        });
        let connected = false;
        try {
            await sequelize.authenticate();
            connected = true;
        } catch (error) {} finally {
            this.sequelize = sequelize;
        }
        return connected;
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
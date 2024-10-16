import { PostgreSqlConfig } from "@/interface/postgresql-client.interface";
import { PostgreSqlClient } from "./postgresql.client";
import { DatabaseClient, DatabaseClientInitResult, DatabaseConfig } from "@/interface/database.interface";

const prepareDatabase = async () => {
    // create database
    // create models
}

class Database {
    public postgresql: DatabaseClientInitResult;
    async initPostgresql({ postgresql }: Required<DatabaseConfig>): Promise<DatabaseClient<PostgreSqlConfig>> {
        await prepareDatabase();
        const client = new PostgreSqlClient();
        await client.init(postgresql);
        return client;
    }
}

export const database = new Database();
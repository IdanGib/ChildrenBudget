import { PostgreSqlConfig } from "@/interface/postgresql-client.interface";
import { PostgreSqlClient } from "./postgresql.client";
import { DatabaseClientInitResult, DatabaseConfig } from "@/interface/database.interface";

const prepareDatabase = async (client: DatabaseClientInitResult) => {
    // create database
    // create models
}

class Database {
    public postgresql: DatabaseClientInitResult;
    async init({ postgresql }: Required<DatabaseConfig>): Promise<void> {
        const client = await new PostgreSqlClient().init(postgresql);
        await prepareDatabase(client);
        this.postgresql = client;
    }
}

export const database = new Database();
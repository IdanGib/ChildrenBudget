import { DatabaseClient, DbClientsOptions } from "@/interface/database.interface";
import { MySqlClient } from "./mysql.client";

export const DbClientsMap: Record<DbClientsOptions, DatabaseClient> = {
    [DbClientsOptions.MY_SQL]: new MySqlClient({})
};
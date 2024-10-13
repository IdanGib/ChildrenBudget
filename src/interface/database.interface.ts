export interface MySqlClientConfig {}

export namespace DatabaseClientActions {
    export interface Parents {
        create: () => void;
    }

    export interface Children {
        create: () => void;   
    }

    export interface Transactions {
        create: () => void;
    }

    export interface Budgets {
        create: () => void;
    }
}

export interface DatabaseClientInitConfig {
    username: string;
    password: string;
    host: string;
    port: number;
}

export interface DatabaseClient {
    init: (config: DatabaseClientInitConfig) => Promise<void>;
    parents: DatabaseClientActions.Parents;
    children: DatabaseClientActions.Children;
    transactions: DatabaseClientActions.Transactions;
    budgets: DatabaseClientActions.Budgets;
}

export enum DbClientsOptions {
    MY_SQL
}
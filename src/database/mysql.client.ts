import { DatabaseClient, DatabaseClientActions, MySqlClientConfig } from "@/interface/database.interface";

export class MySqlClient implements DatabaseClient {
    constructor(private readonly config: MySqlClientConfig) {}
    
    public async init() {
        
    }

    public readonly parents: DatabaseClientActions.Parents = {
        create() {

        },
    };
    
    public readonly children: DatabaseClientActions.Children = {
        create() {}
    };

    public readonly transactions: DatabaseClientActions.Transactions = {
        create() {
            
        },
    }
    
    public readonly budgets: DatabaseClientActions.Budgets = {
        create() {
            
         },
    }
}
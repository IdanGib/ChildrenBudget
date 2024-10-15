export type Login = (args: {}) => Promise<void>;
export type Init = (args: {}) => Promise<void>;

export interface ChildrenBudget {
    login: Login;
    init: Init;
}
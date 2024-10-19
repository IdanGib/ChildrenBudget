import en from '~/assets/en.json';
export class NoBudgetForTransactionError extends Error {
    constructor(public message: string = en.errors.no_budget) {
        super();
    }
}

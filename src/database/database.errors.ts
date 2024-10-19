import en from '~/assets/en.json';
export class NoBudgetForTransactionError extends Error {
    constructor(public message: string = en.errors.no_budget) {
        super();
    }
}

export class UpdatePriceWithoutBudgetIdError extends Error {
    constructor(public message: string = en.errors.update_price_without_budget_id) {
        super();
    }
}
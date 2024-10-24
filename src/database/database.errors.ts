import en from '~/assets/en.json';

const { CreateTransaction, UpdateTransaction, GetBudgetInfo, GetChildInfo, GetParentInfo } = en.errors;

export class CreateTransactionNoBudgetError extends Error {
    constructor(public message: string = CreateTransaction.NO_BUDGET) {
        super();
    }
}

export class UpdateTransactionNoBudgetError extends Error {
    constructor(public message: string = UpdateTransaction.NO_BUDGET) {
        super();
    }
}

export class GetBudgetInfoBudgetNotFoundError extends Error {
    constructor(public message: string = GetBudgetInfo.NO_CHILD) {
        super();
    }
}

export class GetBudgetInfoChildNotFoundError extends Error {
    constructor(public message: string = GetBudgetInfo.NO_CHILD) {
        super();
    }
}

export class GetChildInfoChildNotFound  extends Error {
    constructor(public message: string = GetChildInfo.NO_CHILD) {
        super();
    }
}
export class GetParentInfoParentNotFound extends Error {
    constructor(public message: string = GetParentInfo.NO_PARENT) {
        super();
    }
}

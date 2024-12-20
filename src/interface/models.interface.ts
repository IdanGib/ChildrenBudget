interface Common {
    id: string;
}

export interface Budget extends Common {
    childId: string;
    value: number;
    expirationDate?: Date;
    currency: string;
    title?: string;
    description?: string;
    margin?: boolean;
}

export interface Parent extends Common {
    name?: string;
    imageUrl?: string;
}

export interface Child extends Common {
    name?: string;
    imageUrl?: string;
    parentId: string;
    birthDate?: Date;
}

export interface Transaction extends Common  {
    price: number;
    title?: string;
    description?: string;
    timestamp?: Date;
    budgetId: string;
}
interface Common {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

export interface Budget extends Common {
    childId: string;
    value: number;
    expirationDate: Date;
    currency: string;
    title: string;
    description: string;
}

export interface Parent extends Common {
    name: string;
    imageUrl: string;
}

export interface Child extends Common {
    name: string;
    imageUrl: string;
    parentId: string;
    birthDate: Date;
}

export interface Transaction extends Common  {
    price: number;
    currency: string;
    title: string;
    description: string;
    date: Date;
    budgetId: string;
}
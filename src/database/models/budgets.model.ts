import { Budget } from "@/interface/models.interface";
import { DataTypes, Sequelize } from "sequelize";
import { PARANOID_TABLES } from "@/database/database.constants";
import { BudgetModel } from "@/interface/database.interface";
import { InvalidCurrency } from "@/database/database.errors";
import { Currency } from "@/lib/currency";

export const createBudgetModel = (sequelize: Sequelize) =>
    sequelize.define<BudgetModel, Omit<Budget, 'childId'>>('budgets', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        expirationDate: {
            type: DataTypes.DATE,
        },
        currency: {
            type: DataTypes.CHAR(4),
            allowNull: false,
            validate: {
                isCurrency(value: string) {
                    if (!Currency.isCurrency(value)) {
                        throw new InvalidCurrency();
                    }
                }
            }
        },
        value: {
            type: DataTypes.BIGINT,
            allowNull: false
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        margin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { paranoid: PARANOID_TABLES });
import { Budget } from "@/interface/models.interface";
import { DataTypes, Model, Sequelize } from "sequelize";

export const BudgetModel = (sequelize: Sequelize) =>
    sequelize.define<Model, Omit<Budget, 'childId'>>('budgets', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        expirationDate: {
            type: DataTypes.DATE,
        },
        currency: {
            type: DataTypes.CHAR(36),
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
        }
    }, { paranoid: true });
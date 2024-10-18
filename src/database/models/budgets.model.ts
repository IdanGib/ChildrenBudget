import { Budget } from "@/interface/models.interface";
import { DataTypes, Model, Sequelize } from "sequelize";
import { PARANOID_TABLES } from "../database.constants";

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
            allowNull: false
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
    }, { paranoid: PARANOID_TABLES });
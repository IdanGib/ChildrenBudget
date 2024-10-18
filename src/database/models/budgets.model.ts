import { Budget } from "@/interface/models.interface";
import { DataTypes, Sequelize } from "sequelize";
import { PARANOID_TABLES } from "../database.constants";
import { BudgetModel } from "@/interface/database.interface";

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
        },
        margin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }
    }, { paranoid: PARANOID_TABLES });
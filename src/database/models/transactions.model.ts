import { Transaction } from "@/interface/models.interface";
import { DataTypes, Model, Sequelize } from "sequelize";

export const TransactionModel = (sequelize: Sequelize) => 
    sequelize.define<Model, Omit<Transaction, 'budgetId'>>('transactions', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        title: {
            type: DataTypes.STRING
        },
        description: {
            type: DataTypes.STRING
        },
        timestamp: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        price: {
            type: DataTypes.BIGINT,
            allowNull: false
        }
    });

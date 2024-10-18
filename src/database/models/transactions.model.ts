import { Transaction } from "@/interface/models.interface";
import { DataTypes, Model, Sequelize } from "sequelize";
import { PARANOID_TABLES } from "../database.constants";
import { CreateTransactionArgs } from "@/interface/database.interface";

export const TransactionModel = (sequelize: Sequelize) => 
    sequelize.define<Model<Transaction, CreateTransactionArgs>, Omit<Transaction, 'budgetId'>>('transactions', {
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
    }, {
        paranoid: PARANOID_TABLES
    });

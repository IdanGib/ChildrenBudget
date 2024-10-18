import { Child } from "@/interface/models.interface";
import { DataTypes, Sequelize } from "sequelize";
import { PARANOID_TABLES } from "../database.constants";
import { ChildModel } from "@/interface/database.interface";

export const createChildModel = (sequelize: Sequelize) => 
    sequelize.define<ChildModel, Omit<Child, 'parentId'>>('children', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING
        },
        imageUrl: {
            type: DataTypes.STRING
        },
        birthDate: {
            type: DataTypes.DATE
        }
    }, { paranoid: PARANOID_TABLES });

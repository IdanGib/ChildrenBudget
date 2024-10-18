import { Parent } from "@/interface/models.interface";
import { DataTypes, Sequelize } from "sequelize";
import { PARANOID_TABLES } from "../database.constants";
import { ParentModel } from "@/interface/database.interface";

export const createParentModel = (sequelize: Sequelize) => 
    sequelize.define<ParentModel, Parent>('parents', {
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
        email: {
            type: DataTypes.STRING
        }
    }, { paranoid: PARANOID_TABLES });

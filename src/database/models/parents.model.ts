import { Parent } from "@/interface/models.interface";
import { DataTypes, Model, Sequelize } from "sequelize";

export const ParentModel = (sequelize: Sequelize) => 
    sequelize.define<Model, Parent>('parents', {
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
    }, { paranoid: true });

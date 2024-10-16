import { Child } from "@/interface/models.interface";
import { DataTypes, Model, Sequelize } from "sequelize";

export const ChildModel = (sequelize: Sequelize) => 
    sequelize.define<Model, Omit<Child, 'parentId'>>('children', {
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
    }, { paranoid: true });

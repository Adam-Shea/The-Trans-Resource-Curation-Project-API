import {
    DataTypes, Model, Sequelize, Association
} from 'sequelize'

class Category extends Model {
    public title!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            title: DataTypes.STRING,
        }, { sequelize: sequelize })
    }
}

export default Category
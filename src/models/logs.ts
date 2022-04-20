import {
    DataTypes, Model, Sequelize, Association
} from 'sequelize'

class Logs extends Model {
    public title!: string
    public requestCount!: string;

    // Auto-generated
    public id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            title: DataTypes.STRING,
            requestCount: DataTypes.STRING
        }, { sequelize: sequelize })
    }
}

export default Logs
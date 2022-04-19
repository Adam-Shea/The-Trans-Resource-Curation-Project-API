import {
    DataTypes, Model, Sequelize
} from 'sequelize'

class Article extends Model {
    public title!: string
    public text!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date;
    public updatedAt!: Date;

    public static initialize(sequelize: Sequelize) {
        this.init({
            title: DataTypes.STRING,
            text: DataTypes.STRING
        }, { sequelize: sequelize })
    }
}

export default Article
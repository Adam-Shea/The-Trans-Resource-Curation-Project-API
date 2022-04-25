import {
    DataTypes, Model, Sequelize, Association, BelongsToManyGetAssociationsMixin
} from 'sequelize'
import Category from './category'

class Article extends Model {
    public title!: string
    public text!: string
    public image!: string
    public author!: string

    // Auto-generated
    public id!: number
    public createdAt!: Date;
    public updatedAt!: Date;

    // Populated for inclusions
    public static Category?: Category[]

    public static associations: {
        categories: Association<Article, Category>
    }

    public getArticles!: BelongsToManyGetAssociationsMixin<Category>
    public getArticle!: BelongsToManyGetAssociationsMixin<Category>
    public getArticleByCat!: BelongsToManyGetAssociationsMixin<Category>
    public updateArticle!: BelongsToManyGetAssociationsMixin<Category>

    public static initialize(sequelize: Sequelize) {
        this.init({
            title: DataTypes.STRING,
            text: DataTypes.STRING,
            image: DataTypes.STRING,
            author: DataTypes.STRING,
        }, { sequelize: sequelize })
    }
}

export default Article
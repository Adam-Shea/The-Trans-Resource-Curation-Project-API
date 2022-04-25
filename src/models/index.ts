import { Options, Sequelize } from 'sequelize'
import dotenv from "dotenv"
dotenv.config()

import Article from './article'
import Category from './category'
import Articles_Category from './category'
import Logs from './logs'


// Open database connection
const sequelize = new Sequelize(
    process.env.DB_DATABASE!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        dialect: 'mysql',
        logging: false
    }
)

// Initialize each model in the database
// This must be done before associations are made
let models = [Article, Category, Logs, Articles_Category]
models.forEach(model => model.initialize(sequelize))

Article.belongsToMany(Category, { through: 'Articles_Category' })

// Create database tables
//   force: true causes database to reset with each run
sequelize.sync({})

export {
    sequelize as Database,
    Article, Category, Logs, Articles_Category
}
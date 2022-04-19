import { Options, Sequelize } from 'sequelize'
import dotenv from "dotenv"
dotenv.config()

import article from './article'

// Open database connection
const sequelize = new Sequelize(
    process.env.DB_DATABASE!,
    process.env.DB_USERNAME!,
    process.env.DB_PASSWORD!,
    {
        host: process.env.DB_HOST!,
        dialect: 'mysql',
    }
)

// Initialize each model in the database
// This must be done before associations are made
let models = [article]
models.forEach(model => model.initialize(sequelize))

// Create database tables
//   force: true causes database to reset with each run
sequelize.sync({ force: true })

export {
    sequelize as Database,
    article
}
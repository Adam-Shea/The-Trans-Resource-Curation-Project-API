import { Options, Sequelize } from 'sequelize'

import article from './article'

// Open database connection
// const sequelize = new Sequelize(
//     config.database.database,
//     config.database.username,
//     config.database.password,
//     <Options>config.database
// )

// Initialize each model in the database
// This must be done before associations are made
let models = [article]
// models.forEach(model => model.initialize(sequelize))

// // Create database tables
// //   force: true causes database to reset with each run
// sequelize.sync({ force: true })

export {
    //sequelize as Database,
    article
}
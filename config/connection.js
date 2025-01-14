const Sequelize  = require("sequelize");
require("dotenv").config();

let sequelize;

// if (process.env.JAWSDB_URL) {
//     sequelize = new Sequelize(process.env.JAWSDB_URL); // If hosted on Heroku, connect to Sequelize through Heroku
// } else { // If working locally, connect to Sequelize through credentials in ENV file
    sequelize = new Sequelize(
        process.env.DB_NAME,
        process.env.DB_USER,
        process.env.DB_PASSWORD,
        {
            host: 'localhost',
            dialect: 'mysql',
            port: 3306
        }
    );
//}
    
module.exports = sequelize
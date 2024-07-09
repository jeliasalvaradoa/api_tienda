 //import { config } from '../config/config.js';
//const {config} = require('../config/config.js');
require('dotenv').config();

const config = {
  env: process.env.NODE_ENV || 'dev',
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT || 3000,
  dbUser:  process.env.DB_USER,
  dbPassword:  process.env.DB_PASSWORD,
  dbHost:  process.env.DB_HOST,
  dbName:  process.env.DB_NAME,
  dbPort:  process.env.DB_PORT,
  dbUrl: process.env.DATABASE_URL,
  apiKey: process.env.API_KEY,
  jwtSecret: process.env.JWT_SECRET,
  smtpEmail: process.env.SMTP_EMAIL,
  smtpPassword: process.env.SMTP_PASSWORD,
}
module.exports = {
  development: {
    url: config.dbUrl,
    //username: "",
   /// password: "",
   /// database: "",
   /// host: "",
    dialect: 'postgres',
  //  dialectOptions: {
  ///    ssl: {
   ///     rejectUnauthorized: false
     // }
  ///  }
  },
  production: {
  //  url: config.dbUrl,
    username: config.dbUser,
    password: config.dbPassword,
    database: config.dbPassword,
    host: config.dbHost,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
}




// export const development = {
//   url: config.dbUrl,
//   dialect: 'postgres',
// };
// export const production = {
//   url: config.dbUrl,
//   dialect: 'postgres',
//   dialectOptions: {
//     ssl: {
//       rejectUnauthorized: false
//     }
//   }
// };



/*const { config } = require('./../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  }
}
*/

import  Sequelize from 'sequelize';
import { config } from '../config/config.js';
import setupModels from '../db/models/index.js';

const options = {
  dialect: 'postgres',
  logging: config.isProd ? false : true,
}

if (config.isProd) {
  options.dialectOptions = {
    ssl: {
      rejectUnauthorized: false
    }
  }
}

export const sequelize = new Sequelize(config.dbUrl, options);

setupModels(sequelize);





/***************************************************************************************** */
// const USER = encodeURIComponent(config.dbUser);
// const PASSWORD = encodeURIComponent(config.dbPassword);
// const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
// //const URI = `mysql://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

// const sequelize = new Sequelize(URI, {
//   dialect: 'postgres',
// //  dialect: 'mysql',
//   logging: true,
// });

// export { sequelize }
// setupModels(sequelize)
//sequelize.sync()

/****************************************************************************************/




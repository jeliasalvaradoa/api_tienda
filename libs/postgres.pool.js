import mypool from 'pg';
import { config } from './../config/config.js'

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;
const { Pool } = mypool
export const pool = new Pool({ connectionString: URI });




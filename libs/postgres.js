// conexión básica
import myclien from 'pg';
const { Client } = myclien
async function getConnection() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'jose',
    password: 'admin123',
    database: 'my_store'
  });
  await client.connect();
  return client;
}

export default getConnection;

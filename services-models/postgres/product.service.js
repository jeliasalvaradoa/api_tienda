import { pool } from '../../libs/postgres.pool.js';

export class ProductModel {
  constructor() {}
  static async find() {
    const query = 'SELECT * FROM products';

    const products = await pool.query(query);
    return products.rows;
  }

  static async findOne(id) {
    const query = 'SELECT * FROM products WHERE id = $1';
    const values = [id];

    const product = await pool.query(query, values);
    if (product.rowCount === 0) return null;
    return product.rows;
  }

  static async create(data) {
    const { name, price, image, isblock } = data;

    // crypto.randomUUID()

    const uuidResult = await pool.query('SELECT uuid_generate_v1() as uuid');
    const uuid = uuidResult.rows[0].uuid;
    // console.log (uuid)

    const queryInsert = `INSERT INTO products (id, name, price, image, isblock)
    VALUES ($1, $2, $3, $4, $5 )`;
    const valuesInsert = [uuid, name, price, image, isblock];

    try {
      await pool.query(queryInsert, valuesInsert);
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error creating products');
      // enviar la traza a un servicio interno
      // sendLog(e)
    }

    const query = 'SELECT * FROM products WHERE id = $1';
    const values = [uuid];

    const product = await pool.query(query, values);
    return product.rows;
  }

  static async update(id, changes) {
    // const {
    //   name,
    //   price,
    //   image,
    //   isblock
    // } = changes
    const updateChanges = changes;
    // del objeto separamos los valores y las key en dos arreglos
    const valuesUpdate = Object.values(updateChanges);
    const keyUpdate = Object.keys(updateChanges);
    // insertamos el valor del id que como parámetro viene separado al arreglo
      valuesUpdate.unshift(id);
    //console.log (valuesUpdate)
    //console.log(keyUpdate)


    //iteramos el arreglo para agregar solo las key que venga como parámetro a la actualización
      const queryParts = keyUpdate.map((keyUpdates, index) => keyUpdates+ '= $' + (index + 2))
    //  console.log (queryParts)
      const setClause = queryParts.join(', ')

    const queryUpdate = `UPDATE products SET ${setClause} WHERE id = $1`;


    try {
      await pool.query(queryUpdate, valuesUpdate);
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error updating products');
      // enviar la traza a un servicio interno
    }
    const query = 'SELECT * FROM products WHERE id = $1';
    const values = [id];

    const product = await pool.query(query, values);
    //console.log(product);
    if (product.rowCount === 0) return null;
    return product.rows;
  }

  static async delete(id) {
    const query = 'DELETE  FROM products WHERE id = $1';
    const values = [id];
    try {
      const product = await pool.query(query, values);
      if (product.rowCount === 0) return false;
      else return { id, message: 'product delete' };

      //console.log(product)
    } catch (e) {
      // puede enviarle información sensible
      throw new Error('Error deleting products');
      // enviar la traza a un servicio interno
    }
  }
}

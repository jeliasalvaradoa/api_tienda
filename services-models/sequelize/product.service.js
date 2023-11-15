import boom from '@hapi/boom';
import { Op } from 'sequelize';
import { sequelize } from '../../libs/sequelize.js';

const models = sequelize.models;
export class ProductModel {
  constructor() {}

  static async create(data) {
    // const hash = await bcrypt.hash(data.password, 10);
    const newProduct = await models.Product.create({
      ...data,
      // password: hash
    });
    // console.log('esto es newproduct:=>>',newproduct)
    // delete newproduct.dataValues.password; //Este comando es para que la api no devuelva la constraseña del usuarios ni el hash
    return newProduct;
  }

  static async find(query) {
    const options = {
      include: ['category'],
      where: {}
    }
    const { limit, offset } = query;
    if (limit && offset) {
      options.limit =  limit;
      options.offset =  offset;
    }

    const { price } = query;
    if (price) {
      options.where.price = price;
    }

    const { price_min, price_max } = query;
    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      };
    }
    const products = await models.Product.findAll(options);
    return products;
  }
  static async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category']
    });
    if (!product) {
      throw boom.notFound('product not found');
    }
    return product;
  }

  static async update(id, changes) {
    // const product = await models.product.findByPk(id);
    const product = await this.findOne(id);
    const rta = await product.update(changes);
    return rta;
  }

  static async delete(id) {
    //const product = await models.product.findByPk(id);
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

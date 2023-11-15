import boom from '@hapi/boom';
import { sequelize } from '../../libs/sequelize.js';

const models = sequelize.models;

export class OrderModel {
  constructor() {}

  static async create(data) {
    // const customer = await models.Customer.findOne({
    //   where: {
    //     '$user.id$': data.userId,
    //   },
    //   include: ['user'],
    // });
    // if (!customer) {
    //   throw boom.badRequest('Customer not found');
    // }
  //  const newOrder = await models.Order.create({ customerId: customer.id });
  const newOrder = await models.Order.create(data);

    return newOrder;
  }

  static async addItem(data) {
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  static async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
         'items',
      ],
    });
    if (!order) {
      throw boom.badRequest('Customer not found');
    }
    return order;
  }

  static async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId,
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        },
      ],
    });
    return orders;
  }


  static async delete(id) {
    const order = await this.findOne(id);
    await order.destroy();
    return { id };
  }
}

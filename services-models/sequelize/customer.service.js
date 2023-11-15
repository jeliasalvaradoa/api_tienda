import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { sequelize } from '../../libs/sequelize.js';

const models = sequelize.models;

export class CustomerModel {
  constructor() {}

  static async find() {
    const rta = await models.Customer.findAll({
      include: ['user'] //ojo este user es un alias que viene desde customer.model.js
    });
    return rta;
  }

  static async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (!customer) {
      throw boom.notFound('customer not found');
    }
    return customer;
  }

  /** */
  static async findByUser(userId) {
    const customer = await models.Customer.findAll({
      where: {
        '$user.id$': userId
      },
          include: ['user']

    });
    return customer;
  }

  static async create(data) {
    const hash = await bcrypt.hash(data.user.password, 10);
    const newData = {
      ...data,
      user: {
        ...data.user,
        password: hash
      }
    }
    const newCustomer = await models.Customer.create(newData, {
      include: ['user']
    })
    delete newCustomer.dataValues.user.dataValues.password;//Esta linea es para que no salga el password en respuesta de la api
    // const newUser = await models.User.create(data.user)
    // const newCustomer = await models.Customer.create({
    //   ...data,
    //   userId: newUser.id
    //})
    return newCustomer;
  }

  static async update(id, changes) {
    const model = await this.findOne(id);
    const rta = await model.update(changes);
    return rta;
  }

  static async delete(id) {
    const model = await this.findOne(id);
    await model.destroy();
    return { rta: true };
  }

  }

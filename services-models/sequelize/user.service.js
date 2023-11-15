import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { sequelize } from '../../libs/sequelize.js';

const models = sequelize.models;

export class UserModel {
  constructor() {}

  static async create(data) {
      const hash = await bcrypt.hash(data.password, 10);
      const newUser = await models.User.create({
        ...data,
        password: hash
      });
      // console.log('esto es newUser:=>>',newUser)
      delete newUser.dataValues.password; //Este comando es para que la api no devuelva la constraseña del usuarios ni el hash
      return newUser;

  }

  static async find() {
    try {
      const rta = await models.User.findAll({
        include: ['customer']
      });
      //console.log(rta)
      return rta;
    } catch (error) {
      throw boom.notFound('Error al obtener todos los usuarios');
    }
  }

  static async findOne(id) {
    const user = await models.User.findByPk(id);
    if (!user) {
      throw boom.notFound('User not found');
    }
    return user;
  }

  static async findByEmail(email) {
    const rta = await models.User.findOne({
      where: { email },
    });
    if (!rta) {
      throw boom.unauthorized()
    }
    return rta;
  }

  static async update(id, changes) {

      // const user = await models.User.findByPk(id);
      const user = await this.findOne(id);
      const rta = await user.update(changes);
      return rta;

  }

  static async delete(id) {

      //const user = await models.User.findByPk(id);
      const user = await this.findOne(id);
      await user.destroy();
      return { id };

  }
}

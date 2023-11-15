import boom from '@hapi/boom';
import { sequelize } from '../../libs/sequelize.js';

const models = sequelize.models;

export class CategoryModel {
  constructor() {}

  static async create(data) {
    // const hash = await bcrypt.hash(data.password, 10);
    const newCategory = await models.Category.create({
      ...data,
      // password: hash
    });
    // console.log('esto es newcategory:=>>',newcategory)
    // delete newcategory.dataValues.password; //Este comando es para que la api no devuelva la constraseña del usuarios ni el hash
    return newCategory;
  }

  static async find() {
    const rta = await models.Category.findAll();
    return rta;
  }

  static async findOne(id) {
    const category = await models.Category.findByPk(id, {
      include: ['products']
    });
    if (!category) {
      throw boom.notFound('category not found');
    }
    return category;
  }

  static async update(id, changes) {
    // const category = await models.category.findByPk(id);
    const category = await this.findOne(id);
    const rta = await category.update(changes);
    return rta;
  }

  static async delete(id) {
    //const category = await models.category.findByPk(id);
    const category = await this.findOne(id);
    await category.destroy();
    return { id };
  }
}

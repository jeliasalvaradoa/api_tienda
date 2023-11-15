import faker from 'faker';
import boom from '@hapi/boom';
import { readJSON } from "../../utils.js"
const products = readJSON('./product.json')

export class ProductModel {
  static async find() {
    return (products);

  }
  static async findOne(id) {
    const product = products.find((item) => item.id === id);
    if (!product) {
      throw boom.notFound('product not found');
    }
    if (product.isBlock) {
      throw boom.conflict('product is block');
    } else {
      return product;
    }
  }
  static async create(data) {
    const newProduct = {
      id: faker.datatype.uuid(),
      ...data,
    };
    products.push(newProduct);
    return newProduct;
  }



  static async update(id, changes) {
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    const product = products[index];

    products[index] = {
      ...product,
      ...changes,
    };
    return products[index];
  }

  static async delete(id) {
    const index = products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    products.splice(index, 1);
    return { id };
  }
}


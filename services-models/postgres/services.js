/* Servicios usando la base de datos directamente sin sequelize
 * solo se creo el modelo de servicio de product para mostrar
 * el ejemplo de como se hace la inyección de dependencia
 * directamente desde la base de datos sin uso del ORM Sequelize
 */
import { ProductModel } from './product.service.js';
// import { CategoryModel } from './category.service.js';
// import { UserModel } from './user.service.js';
// import { OrderModel } from './order.service.js';
// import { CustomerModel } from './customer.service.js';
// import { AuthModel } from './auth.service.js';

export const services = {
  productModel: ProductModel,
  // userModel: UserModel,
  // categoryModel: CategoryModel,
  // orderModel: OrderModel,
  // customerModel: CustomerModel,
  // authModel: AuthModel,
};

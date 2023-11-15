/* Servicios usando JSON local **PARA NADA RECOMENDADO**
 * solo se creo el modelo de servicio de product para mostrar
 * el ejemplo de como se hace la inyección de dependencia
 * directamente desde un JSON local sin de base de datos ni ORM Sequelize
 */
import { ProductModel } from './product.service.js';
//import { CategoryModel } from './category.service.js';
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

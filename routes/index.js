import { Router } from 'express';

import { createProductRouter } from './products.router.js';
import { createCategoryRouter } from './category.router.js';
import { createUserRouter } from './user.router.js';
import { createCustomerRouter } from './customer.router.js';
import { createOrderRouter } from './order.router.js';
import { createProfileRouter } from './profile.router.js';
import { createAuthRouter } from './auth.router.js';

export default function routerApi(app,
  {productModel, categoryModel, userModel, customerModel, orderModel, authModel}) {
  const router = Router();
  app.use('/api/v1', router);
  router.use('/products', createProductRouter({ productModel }));
  router.use('/categories', createCategoryRouter({ categoryModel }));
  router.use('/users', createUserRouter({ userModel }));
  router.use('/customers', createCustomerRouter({ customerModel }));
  router.use('/orders', createOrderRouter({ orderModel }));
  router.use('/profile', createProfileRouter({customerModel, orderModel}));
  router.use('/auth', createAuthRouter({ authModel }));


}

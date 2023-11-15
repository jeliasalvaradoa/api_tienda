import { Router } from 'express';
import passport from 'passport';
import { ProductController } from '../controllers/products.controllers.js'
import validatorHandler from '../middlewares/validator.handler.js';
import { checkRoles } from '../middlewares/auth.handler.js';
import {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema
} from '../schemas/product.schema.js';


export const createProductRouter = ({ productModel }) => {

  const productRouter = Router()

  const productController = new ProductController({ productModel })

  productRouter.get('/',
  validatorHandler(queryProductSchema, 'query'),
  productController.getAll)

  productRouter.get('/:id',
  validatorHandler(getProductSchema, 'params'),
  productController.getById)

  productRouter.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createProductSchema, 'body'),
  productController.createProduct)

  productRouter.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'params'),
  validatorHandler(updateProductSchema, 'body'),
  productController.updateProduct)

  productRouter.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getProductSchema, 'params'),
  productController.deleteProduct)

  return productRouter
}

import { Router } from 'express';
import passport from 'passport';
import { OrderController } from '../controllers/order.controllers.js'
import validatorHandler from '../middlewares/validator.handler.js';
import { checkRoles } from '../middlewares/auth.handler.js';
import {getOrderSchema,
  createOrderSchema,
  addItemSchema,
} from '../schemas/order.schema.js';


export const createOrderRouter = ({ orderModel }) =>{

  const orderRouter = Router()

  const orderController = new OrderController({ orderModel })

   orderRouter.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'),
  validatorHandler(createOrderSchema, 'body'),
  orderController.createOrder)

  orderRouter.post('/add-item',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'),
  validatorHandler(addItemSchema, 'body'),
  orderController. addNewIdtem)

  orderRouter.get('/:id',
  validatorHandler(getOrderSchema, 'params'),
  checkRoles('admin'),
  orderController.getById)

  orderRouter.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getOrderSchema, 'params'),
  orderController.deleteOrder)

  return orderRouter
}

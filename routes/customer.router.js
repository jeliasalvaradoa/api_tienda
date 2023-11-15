import { Router } from 'express';
import passport from 'passport';
import { CustomerController } from '../controllers/customer.controllers.js'
import { checkRoles } from '../middlewares/auth.handler.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  createCustomerSchema,
  updateCustomerSchema,
  getCustomerSchema,
} from '../schemas/customer.schema.js';


export const createCustomerRouter = ({ customerModel }) =>{

  const customerRouter = Router()

  const customerController = new CustomerController({ customerModel })

  customerRouter.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  customerController.getAll)

  customerRouter.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  customerController.getById)

  customerRouter.post('/',
  validatorHandler(createCustomerSchema, 'body'),
  customerController.createCustomer)

  customerRouter.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  validatorHandler(updateCustomerSchema, 'body'),
  customerController.updateCustomer)

  customerRouter.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCustomerSchema, 'params'),
  customerController.deleteCustomer)

  return customerRouter
}

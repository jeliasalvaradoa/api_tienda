import { Router } from 'express';
import passport from 'passport';
import { UserController } from '../controllers/user.controllers.js'
import validatorHandler from '../middlewares/validator.handler.js';
import { checkRoles } from '../middlewares/auth.handler.js';
import {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  getByEmailSchema,
} from '../schemas/user.schema.js';


export const createUserRouter = ({ userModel }) =>{

  const userRouter = Router()

  const userController = new UserController({ userModel })

  userRouter.get('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  userController.getAll)

  userRouter.get('/email/:email',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getByEmailSchema, 'params'),
  userController.getByEmail)

  userRouter.get('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  userController.getById)

  userRouter.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createUserSchema, 'body'),
  userController.createUser)

  userRouter.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  validatorHandler(updateUserSchema, 'body'),
  userController.updateUser)

  userRouter.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getUserSchema, 'params'),
  userController.deleteUser)

  return userRouter
}

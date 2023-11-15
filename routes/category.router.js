import { Router } from 'express'
import passport from 'passport';
import { CategoryController } from '../controllers/category.controllers.js'
import validatorHandler from '../middlewares/validator.handler.js';
import { checkRoles } from '../middlewares/auth.handler.js';
import {
  createCategorySchema,
  updateCategorySchema,
  getCategorySchema,
} from '../schemas/category.schema.js';


export const createCategoryRouter = ({ categoryModel }) =>{

  const categoryRouter = Router()

  const categoryController = new CategoryController({ categoryModel })

  categoryRouter.get('/', categoryController.getAll)

  categoryRouter.get('/:id',
  validatorHandler(getCategorySchema, 'params'),
  categoryController.getById)

  categoryRouter.post('/',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(createCategorySchema, 'body'),
  categoryController.createCategory)

  categoryRouter.patch('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  validatorHandler(updateCategorySchema, 'body'),
  categoryController.updateCategory)

  categoryRouter.delete('/:id',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin'),
  validatorHandler(getCategorySchema, 'params'),
  categoryController.deleteCategory)

  return categoryRouter
}

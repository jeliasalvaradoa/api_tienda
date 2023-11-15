import { Router } from 'express';
import passport from 'passport';
import { ProfileController } from '../controllers/profile.controllers.js';
import { checkRoles } from '../middlewares/auth.handler.js';

export const createProfileRouter = ({customerModel, orderModel}) =>{

  const profileRouter = Router()

  const profileController = new ProfileController({customerModel, orderModel})

  profileRouter.get('/my-orders',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin','customer'),
  profileController.getMyOrders)

  profileRouter.get('/my-profile',
  passport.authenticate('jwt', {session: false}),
  checkRoles('admin', 'customer'),
  profileController.getMyProfile)


  return profileRouter
}

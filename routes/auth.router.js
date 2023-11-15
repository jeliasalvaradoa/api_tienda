import { Router } from 'express';
import passport from 'passport';

import { AuthController } from '../controllers/auth.controllers.js';
import validatorHandler from '../middlewares/validator.handler.js';
import {
  loginAuthSchema,
  recoveryAuthSchema,
  changePasswordAuthSchema,
} from '../schemas/auth.schema.js';

export const createAuthRouter = ({ authModel }) => {
  const authRouter = Router();

  const authController = new AuthController({ authModel });

  authRouter.post(
    '/login',
    validatorHandler(loginAuthSchema, 'body'),
    passport.authenticate('local', { session: false }),
    authController.createAuth
  );

  authRouter.post(
    '/recovery',
    validatorHandler(recoveryAuthSchema, 'body'),
    authController.recoveryPass
  );

  authRouter.post(
    '/change-password',
    validatorHandler(changePasswordAuthSchema, 'body'),
    authController.changePass
  );


  return authRouter;
};

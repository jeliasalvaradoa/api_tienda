//import { AuthModel } from './../services-models/sequelize/auth.service.js';
export class AuthController {
  constructor({authModel}) {
  this.authModel = authModel
  }

  createAuth = async (req, res, next) => {
    try {
      const user = req.user;
      res.json(this.authModel.signToken(user));
    } catch (error) {
      next(error);
    }
  };

  recoveryPass = async (req, res, next) => {
    try {
      const { email } = req.body;
      const rta = await this.authModel.sendRecovery(email);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  };

 changePass = async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const rta = await this.authModel.changePassword(token, newPassword);
      res.json(rta);
    } catch (error) {
      next(error);
    }
  }




}

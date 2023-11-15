import { Strategy } from 'passport-local';
import { AuthModel } from './../../../services-models/sequelize/auth.service.js';

//const services = new AuthModel(); no se puede llamar un metodo estático desde
//una instancia

export const LocalStrategy = new Strategy({
    usernameField: 'email',
    passwordField: 'password'
  },
  async (email, password, done) => {
    try {
      const user = await AuthModel.getUser(email, password);
      done(null, user);
    } catch (error) {
      done(error, false);
    }
  }
);






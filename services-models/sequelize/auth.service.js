import boom from '@hapi/boom';
import bcrypt from 'bcrypt';
import { config } from '../../config/config.js';
import { UserModel } from './user.service.js';
import jwt from 'jsonwebtoken';
import { createTransport } from 'nodemailer';
//const service = new UserModel(); la instancia no se
//crea porque estas trabajando con funciones estaticas en user.service,js

export class AuthModel {
  constructor() {}

 static async getUser(email, password) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      throw boom.unauthorized();
    }
    delete user.dataValues.password;
    return user;
  }

  static signToken(user) {
    const payload = {
      sub: user.id,
      role: user.role,
    };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '15min' });
    return {
      user,
      token,
    };
  }


 static async sendRecovery(email) {
    const user = await UserModel.findByEmail(email);
    if (!user) {
      throw boom.unauthorized();
    }

    jwt.verify(user.recoveryToken, config.jwtSecret, (err) => {
      if (!err) {
        throw boom.badRequest('You already have a active token.');
      }
    });
    const payload = { sub: user.id };
    const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '10min' });
    const link = `http://myfrontend.com/recovery?token=${token}`;
    await UserModel.update(user.id, { recoveryToken: token });
    const mail = {
      from: config.smtpEmail,
      to: `${user.email}`,
      subject: 'Email para recuperar contraseña',
      html: `<b>Ingresa a este link => ${link}</b>`,
    };
    const rta = await this.sendMail(mail);
    return rta;
  }  

 static async changePassword(token, newPassword) {
    const payload = jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        throw boom.notAcceptable(err.name);

      }
      return decoded;
    }); //como saber si el token expiró?
    const user = await UserModel.findOne(payload.sub);
    if (token !== user.recoveryToken) {
      throw boom.notAcceptable("Sorry, valid but not the same token");
    }

    const hash = await bcrypt.hash(newPassword, 10);
        await UserModel.update(user.id, { recoveryToken: null, password: hash });
    return { message: "password changed successfully" };
  }


   static async sendMail(infoMail) {
    const transporter = createTransport({
      host: 'smtp.gmail.com',
      secure: true,
      port: 465,
      auth: {
        user: config.smtpEmail,
        pass: config.smtpPassword,
      },
    });
    await transporter.sendMail(infoMail);
    return { message: 'mail sent' };
  }
}




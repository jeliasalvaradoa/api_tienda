import joi from 'joi';

const email = joi.string().email(),
  password = joi.string().min(8),
  newPassword = joi.string().min(8),
  token = joi.string().regex(
    /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
  );

const loginAuthSchema = joi.object({
  email: email.required(),
  password: password.required(),
});

const recoveryAuthSchema = joi.object({
  email: email.required(),
});

const changePasswordAuthSchema = joi.object({
  token: token.required(),
  newPassword: newPassword.required(),
});

export {
  loginAuthSchema,
  recoveryAuthSchema,
  changePasswordAuthSchema,
};

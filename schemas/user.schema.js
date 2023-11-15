import joi from 'joi';

const id = joi.string().uuid();
const email = joi.string().min(3).required().email();
const password = joi.string().min(3)
const role = joi.string().min(5)


const createUserSchema = joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required()
});

const updateUserSchema = joi.object({
  email: email,
  role: role
});

const getUserSchema = joi.object({
  id: id.required(),
});

const getByEmailSchema = joi.object({
  email: email.required(),
});
export { createUserSchema, updateUserSchema, getUserSchema, getByEmailSchema }

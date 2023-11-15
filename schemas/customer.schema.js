import joi from 'joi';


const id = joi.string().uuid()
const name = joi.string().min(3).max(30)
const lastName = joi.string()
const phone = joi.string()
const userId = joi.string().uuid() //solo para cuando se quiere actualizar

const email = joi.string().email()
const password = joi.string()

const getCustomerSchema = joi.object({
  id: id.required()
 })

const createCustomerSchema = joi.object({
  name: name.required(),
  lastName: lastName.required(),
  phone: phone.required(),
 // userId: userId.required(),
   user: joi.object({
   email: email.required(),
   password: password.required()
   }),
})
const updateCustomerSchema = joi.object({
  name,
  lastName,
  phone,
  userId
 })
export { getCustomerSchema, createCustomerSchema, updateCustomerSchema }

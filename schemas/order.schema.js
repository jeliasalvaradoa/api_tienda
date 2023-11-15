import joi from 'joi';

const id = joi.number().integer()
const customerId = joi.string().uuid()
const orderId = joi.number().integer()
const productId = joi.string().uuid()
const amount = joi.number().integer().min(1)

const getOrderSchema = joi.object({
  id: id.required(),
})

const createOrderSchema = joi.object({
  customerId: customerId.required(),
})

const addItemSchema = joi.object({
  orderId: orderId.required(),
  productId: productId.required(),
  amount: amount.required(),
})

export { getOrderSchema, createOrderSchema, addItemSchema }

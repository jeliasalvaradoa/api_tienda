import joi from 'joi';
//import joi from '@hapi/joi/dist/joi-browser.min.js';

const id = joi.string().uuid()
const name = joi.string().min(3).max(15)
const price = joi.number().integer().min(10)
const description = joi.string().min(15)
const image = joi.string().uri()
const isblock = joi.boolean()
const categoryId = joi.number().integer()
const limit = joi.number().integer();
const offset = joi.number().integer();
const price_min = joi.number().integer();
const price_max = joi.number().integer();


const createProductSchema = joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  isblock: isblock,
  categoryId: categoryId.required()
});

const updateProductSchema = joi.object({
  name: name,
  price: price,
  description: description,
  image: image,
  isblock: isblock,
  categoryId: categoryId
});

const getProductSchema = joi.object({
  id: id.required(),
});
const queryProductSchema = joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.when('price_min', {
    is: joi.number().integer().required(),
    then: joi.required()
 })
});

export { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema }

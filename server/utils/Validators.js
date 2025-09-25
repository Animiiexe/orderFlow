import Joi from 'joi';

const orderSchema = Joi.object({
  customerName: Joi.string().min(3).max(30).required(),
  customerEmail: Joi.string().email().required(),
  contactPhone: Joi.string().pattern(/^\d{10}$/).required(),
  shippingAddress: Joi.string().max(100).required(),
  productName: Joi.string().min(3).max(50).required(),
  quantity: Joi.number().integer().min(1).max(100).required()
});

const adminLoginSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required()
});

export { orderSchema, adminLoginSchema };

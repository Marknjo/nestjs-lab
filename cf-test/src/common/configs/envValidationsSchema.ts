import * as Joi from 'joi';

export const validationSchema = Joi.object({
  DB_USER: Joi.string().required(),
  DB_PASS: Joi.required().default(5432),
  DB_NAME: Joi.string().required(),
  DB_HOST: Joi.string().required(),
  DB_PORT: Joi.string().required(),
});

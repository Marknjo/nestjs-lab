import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';

/// Database Configuration Options
const configDefaultOptions: ConfigModuleOptions = {
  validationSchema: Joi.object({
    DB_HOST: Joi.required(),
    DB_PORT: Joi.number().default(5432),
    DB_NAME: Joi.string().default('postgres'),
    DB_USER: Joi.required(),
    DB_PASS: Joi.required(),
  }),
};

export const configDevOptions: ConfigModuleOptions = {
  ...configDefaultOptions,
};
export const configProdOptions: ConfigModuleOptions = {
  ignoreEnvFile: true,
  ...configDefaultOptions,
};

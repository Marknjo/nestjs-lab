import { ConfigModuleOptions } from '@nestjs/config';
import * as Joi from 'joi';
import { env } from 'process';

/// Database Configuration Options - Required Database connection options
const configDefaultOptions: ConfigModuleOptions = {
  envFilePath: '.env',
  validationSchema: Joi.object({
    DB_PORT: Joi.required().default(27017),
    DB_USER: Joi.required(),
    DB_PASS: Joi.required(),
    DB_HOST: Joi.required(),
    DB_NAME: Joi.required().default('coffeemongo'),
  }),
};

const configDevOptions: ConfigModuleOptions = {
  ...configDefaultOptions,
};
const configProdOptions: ConfigModuleOptions = {
  ignoreEnvFile: true,
  ...configDefaultOptions,
};

export const ConfigOptions =
  env.NODE_ENV === 'production' ? configProdOptions : configDevOptions;
